"use server"

import { db } from "@/lib/prisma"
import { subDays } from "date-fns"

const ACCOUNT_ID = "f3b79ceb-bac0-4651-8ff5-da733887da87"
const USER_ID = "845c2e7d-c384-492e-a4e8-a237f38d672e"

const CATEGORIES =  {
    INCOME : [
        {name: "salary", range: [6000, 8000]},
        {name: 'freelance', range: [2000, 3000]},
        {name: 'investment', range: [1000, 2000]},
        {name: 'other-income', range: [500, 1000]}
    ],

    EXPENSE : [
        {name: 'rent', range: [500, 1000]},
        {name: 'groceries', range: [200, 500]},
        {name: 'utilities', range: [100, 300]},
        {name: 'entertainment', range: [100, 300]},
        {name: 'transportation', range: [50, 200]},
    ]
}

//helper to get random category with range
function getRandomAmount(min, max){
    return Number((Math.random() * (max - min) + min).toFixed(2))
}

//helper to get random category with amount
function getRandomCategory(type){
    const categories = CATEGORIES[type]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const amount = getRandomAmount(category.range[0], category.range[1])
    return {category: category.name, amount}
}

export async function seedTransactions(){
    try{
        //generate 7 days of transactions
        const transactions = []
        let totalBalance = 0 

        for(let i = 7; i >= 0; i--){
            const date = subDays(new Date(), i)

            //generate 1-3 transactions per day
            const transactionsPerDay = Math.floor(Math.random() * 3 ) + 1

            for(let j = 0; j < transactionsPerDay; j++){
                // 40% chance of income, 60% expense
                const type = Math.random() < 0.4 ? 'INCOME' : 'EXPENSE'
                const  { category, amount } = getRandomCategory(type)

                const transaction = {
                    id: crypto.randomUUID(),
                    type,
                    amount,
                    description: `${ type === "INCOME" ? "Recieved" : "Paid for"}  ${category}`,
                    date,
                    category,
                    status:"COMPLETED",
                    userId: USER_ID,
                    accountId: ACCOUNT_ID,
                    createdAt: date,
                    updatedAt: date
                }

                totalBalance += type === "INCOME" ? amount : -amount
                transactions.push(transaction)
            }
        }

        //insert transactions in batches and  update account balance
        await db.$transaction(async (tx) => {
            //clear existing transactions
            await tx.transaction.deleteMany({
                where:{accountId: ACCOUNT_ID}
            })

            //insert new transactions
            await tx.transaction.createMany({
                data: transactions
            })

            //update account balance
            await tx.account.update({
                where: { id: ACCOUNT_ID},
                data: {balance: totalBalance}
            })
        })

        return{ success: true, message: `${transactions.length} transactions seeded successfully`}
    }catch(error){
        console.log(error.message)
        return {success: false, error: error.message}
    }
}