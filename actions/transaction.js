'use server'

import { aj } from "@/lib/arcjet"
import { db } from "@/lib/prisma"
import { request } from "@arcjet/next"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

const serializedAmount = (obj) => ({
    ...obj,
    amount: obj.amount.toNumber()
})

export async function createTransaction(data){
    try{
        const {userId} = await auth()
        if(!userId){
            throw new Error ("Unauthorized !")
        }

        //get request data for Arcjet
        const req = await request()
        const decision = await aj.protect(req,{
            userId,
            requested: 1
        })

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                const {remaining, reset} = decision.reason
                console.error({
                    code: "RATE_LIMITING_EXCEEDE",
                    details:{
                        remaining,
                        resetInSeconds: reset
                    }
                })

                return {
                    success: false,
                    error: "Too many requests. Please try again later !"
                }

            }

            throw new Error("Request Blocked !")
        }

        const user = await db.user.findUnique({
            where: {clerkUserId: userId}
        })
        if(!user){
            throw new Error('User not found !')
        }

        const account = await db.account.findUnique({
            where: { 
                id: data.accountId, 
                userId: user.id
            }
        })

        if(!account){
            throw new Error("Account not found !")
        }


        const balanceChange = data.type === 'EXPENSE' ? -data.amount : data.amount
        const newBalance = account.balance.toNumber() + balanceChange

        const transaction = await db.$transaction( async (tx) => {
            const newTransaction = await tx.transaction.create({
                data: {
                    ...data,
                    userId: user.id,
                    nextRecurringDate: data.isRecurring && data.recurringInterval 
                    ? calculateNextRecurringDate(data.date, data.recurringInterval) 
                    : null
                }
            })
            await tx.account.update({
                where: {id: data.accountId},
                data: {balance: newBalance}
            })
            return newTransaction
        })

        revalidatePath('/dashboard')
        revalidatePath(`/account/${transaction.accountId}`)

        return {success:true, data: serializedAmount(transaction)}

    }catch(error){
        
        return {success: false, error: error.message}
    }
}

//helper function to calculate next recurring date
function calculateNextRecurringDate(startDate, interval){
    const date =  new Date(startDate)

    switch(interval){
        case "DAILY":
            date.setDate(date.getDate() + 1)
            break
        case "WEEKLY":
            date.setDate(date.getDate() + 7)
            break
        case "MONTHLY":
            date.setDate(date.getMonth() + 1)
            break
        case "YEARLY":
            date.setDate(date.getFullYear() + 1)
            break
    }

    return date
}