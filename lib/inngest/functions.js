import { db } from "../prisma";
import { inngest } from "./client";

export const checkBudgetAlert = inngest.createFunction(
  { id: "Check Budget Alerts" },
  { cron: "0 */6 * * *" },
  async ({ step }) => {
    const budgets = await step.run("fetch-budget", async () => {
        return await db.budget.findMany({
            include: {
                user: {
                    include: {
                        accounts: {
                            where: {
                                isDefault: true
                            }
                        }
                    }
                }
            }
        })
    })

    for(const budget of budgets){
        const defaultAccount = budget.user.accounts[0]
        if(!defaultAccount) continue

        await step.run(`check-budget-${budget.id}`, async () => {
            const currentDate = new Date()
            const startOfMonth = new Date(
                currentDate.getFullYear(), currentDate.getMonth(), 1
            )
            const endOfMonth = new Date(
                currentDate.getFullYear(), currentDate.getMonth() + 1, 0
            )

            const expenses = await db.transaction.aggregate({
                where: {
                    userId: budget.userId,
                    accountId: defaultAccount.id,
                    type: "EXPENSE",
                    date: {
                        gte: startOfMonth,
                        lte: endOfMonth
                    }
                },
                _sum: {
                    amount: true
                }
            })

            const totalExpenses = expenses._sum.amount?.toNumber() || 0
            const budgetAmount = budget.amount
            const persentageUsed = (totalExpenses/budgetAmount) * 100
            console.log(persentageUsed)

            if(persentageUsed >= 80 && (!budget.lastAlertSent || isNewMonth(new Date(budget.lastAlertSent), new Date()))){
                //send email
                // update last alert date
                await db.budget.update({
                    where: {
                        id: budget.id
                    },
                    data: {
                        lastAlertSent: new Date()
                    }
                })
            }
        })
    }
  },
);

function isNewMonth(lastAlertDate, currentDate){
    return(
        lastAlertDate.getMonth() !== currentDate.getMonth() || lastAlertDate.getFullYear() !== currentDate.getFullYear()
    )
}