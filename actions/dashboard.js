"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

const serializeTransaction = (obj) =>{
    const serialized = {...obj}

    if(obj.balance){
        serialized.balance = obj.balance.toNumber()
    }
}

export async function createAccount(params) {
    try{
        const {userId} = await auth()
        if(!userId) {
            throw new Error("Unauthorized !")
        }
        const user = await db.user.findUnique({
    where:{
        clerkUserId:userId
    }})
    if(!user){
        throw new Error("User not found !")
    }

    //convert balance to float
    const balanceFloat = parseFloat(params.balance)
    if(isNaN(balanceFloat)){
        throw new Error("Invalid balance amount !")
    }

    //check if this is the first acc
    const existingAccounts = await db.account.findMany({
        where: {userId : user.id}
    })

    const shouldBeDefault = existingAccounts.length === 0 ? true : params.isDefault
    //if this account should be default, unset other default accounts
    if(shouldBeDefault) {
        await db.account.updatMany({
            where:{ userId: user.id, isDefault: true },
            params: {isDefault: false}
        })
    }

    //create account
    const account = await db.account.create({
        params:{
            ...params,
            balance: balanceFloat,
            userId: user.id,
            isDefault: shouldBeDefault, 
        }
    })

    const serializedAccount = serializeTransaction(account)

    revalidatePath("/dashboard")
    return {success:true, data: serializedAccount}
    }catch(error){
        throw new Error(error.message)
    }
    
}