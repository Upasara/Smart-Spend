"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

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
    }catch(error){

    }
}

export {createAccount}