"use server"

import { db } from "@/lib/prisma"
import { id } from "date-fns/locale"

const { auth } = require("@clerk/nextjs/server")
const { revalidatePath } = require("next/cache")

const serializedTransaction = (obj) =>{
    const serialized = {...obj}

    if(obj.balance){
        serialized.balance = obj.balance.toNumber()
    }

    if(obj.amount){
        serialized.amount = obj.amount.toNumber()
    }

    return serialized
}

async function updateDefaultAccount(accountId){
    try{
        const {userId} = await auth()
        if(!userId) throw new Error("User Not Authorized !")

        const user = await db.user.findUnique({
            where : {clerkUserId : userId}
        })

        if(!user){
            throw new Error("User Not Found !") 
        }

        await db.account.updateMany({
            where : {userId : user.id, isDefault: true},
            data : {isDefault : false}
        })

        const account = await db.account.update({
            where : { id: accountId, userId : user.id},
            data : {isDefault : true}
        })
        revalidatePath("/dashboard")
        return {success: true, data : serializedTransaction(account)}
    }catch(error){
        return {success:false, error : error.message}
    }
}

async function getAccountWithTransaction(accountId){
    const {userId} = await auth()
    if(!userId) throw new Error("User Not Authorized !")

    const user = await db.user.findUnique({
        where : {clerkUserId : userId}
    })

    if(!user){
        throw new Error("User Not Found !")
    }
    
    const account = await db.account.findUnique({
        where : {id : accountId, userId : user.id},
        include : {
            transactions : {orderBy : {date : 'desc'}},
            _count : {select : {transactions : true}}
        }
    })

    if(!account) return null

    const serializedTransaction = JSON.parse(JSON.stringify(account))

    return serializedTransaction
}

export {updateDefaultAccount, getAccountWithTransaction}