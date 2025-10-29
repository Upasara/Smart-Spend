"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

const serializeTransaction = (obj) => {
    const serialized  = {...obj}

    if(obj.balance){
        serialized.balance = obj.balance.toNumber()
    }

    if(obj.amount){
        serialized.amount = obj.amount.toNumber()
    }

    return serialized
}

async function createAccount(data){
    try{
        const {userId} = await auth()
        if(!userId) throw new Error("User Not Authorized !")

        const user = await db.user.findUnique({
            where: {clerkUserId: userId}
        })

        if(!user){
            throw new Error("User Not Found !")
        }

        const balanceFloat = parseFloat(data.balance)
        if(isNaN(balanceFloat)){
            throw new Error("Invalid Balance Amount !")
        }

        //check if this is the user's first account
        const excistingAccounts = await db.account.findMany({
            where: {userId: user.id}
        })

        const shouldBeDefault = excistingAccounts.length === 0 ? true : data.isDefault

        if( shouldBeDefault){
            await db.account.updateMany({
                where: {userId: user.id, isDefault: true },
                data: {isDefault: false}
            })
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance : balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            }
        })

        const serializedAccount = serializeTransaction(account)
        revalidatePath("/dashboard")
        return {success : true, data:serializedAccount}
    }catch(error){
        throw new Error(error.message)
    }
}

async function getUserAccounts(){
    const {userId} = await auth()
    if(!userId) throw new Error("User Not Authorized !")

    const user = await db.user.findUnique({
        where : {clerkUserId : userId}
    })

    if(!user){
        throw new Error("User Not Found !")
    }

    const accounts = await db.account.findMany({
        where : {userId : user.id},
        orderBy : {createdAt : "desc"},
        include : {
            _count : {
                select : {
                    transactions : true
                }
            }
        }
    })

    const serializedAccount = accounts.map(serializeTransaction)
    return serializedAccount
} 

export {createAccount, getUserAccounts}