'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns/format';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const DashboardOverview = ({ accounts, transactions }) => {
 const [selectedAccountId, setSelectedAccountId] = useState(
  accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
 );

 //filter transactions for selected account
 const accountTransactions = transactions.filter(
  (t) => t.accountId === selectedAccountId
 );

 const recentTransactions = accountTransactions
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 5);

 // calculate expense breakdown for current month
 const currentDate = new Date();
 const currentMonthExpenses = accountTransactions.filter((t) => {
  const transactionDate = new Date(t.date);
  return (
   t.type === 'EXPENSE' &&
   transactionDate.getMonth() === currentDate.getMonth() &&
   transactionDate.getFullYear() === currentDate.getFullYear()
  );
 });

 //group expenses by category
 const expensesbyCategory = currentMonthExpenses.reduce((acc, transaction) => {
  const category = transaction.category;
  if (!acc[category]) {
   acc[category] = 0;
  }
  acc[category] += transaction.amount;
  return acc;
 }, {});

 //format daata for pie chart
 const pieChartData = Object.entries(expensesbyCategory).map(
  ([category, amount]) => ({
   name: category,
   value: amount,
  })
 );

 return (
  <div className='grid gap-4 md:grid-cols-2'>
   <Card className='border border-green-200 hover:shadow-md hover:-translate-y-0.5 hover:border-green-300 duration-300'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
     <CardTitle>Recent Transactions</CardTitle>
     <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
      <SelectTrigger className='w-[140px] border border-green-200 focus:ring-0 focus:border-green-300 hover:cursor-pointer'>
       <SelectValue placeholder='Select Account' />
      </SelectTrigger>
      <SelectContent className='border border-green-300'>
       {accounts.map((account) => (
        <SelectItem key={account.id} value={account.id}>
         {account.name}
        </SelectItem>
       ))}
      </SelectContent>
     </Select>
    </CardHeader>
    <CardContent>
     <div className='space-y-4'>
      {recentTransactions.length === 0 ? (
       <p className='text-center text-muted-foreground py-4'>
        No Recent Transactions
       </p>
      ) : (
       recentTransactions.map((transaction) => {
        return (
         <div
          key={transaction.id}
          className='flex items-center justify-between'
         >
          <div className='space-y-1'>
           <p className='text-sm font-medium leading-none'>
            {transaction.description || 'untitled transaction'}
           </p>
           <p className='text-sm text-muted-foreground'>
            {format(new Date(transaction.date), 'PP')}
           </p>
          </div>
          <div className='flex items-center gap-2'>
           <div
            className={cn(
             'flex items-center',
             transaction.type === 'EXPENSE' ? 'text-red-600' : 'text-green-600'
            )}
           >
            {transaction.type === 'EXPENSE' ? (
             <ArrowDownRight className='mr-1 h-3 w-3' />
            ) : (
             <ArrowUpRight className='mr-1 h-3 w-3' />
            )}
            Rs.{transaction.amount.toFixed(2)}
           </div>
          </div>
         </div>
        );
       })
      )}
     </div>
    </CardContent>
   </Card>
   <Card className='border border-green-200 hover:shadow-md hover:-translate-y-0.5 hover:border-green-300 duration-300'>
    <CardHeader>
     <CardTitle>Monthly Expense Breakdown</CardTitle>
    </CardHeader>
    <CardContent className='p-0 pb-5'>
     {pieChartData.length === 0 ? (
      <p className='text-center text-muted-foreground py-4'>
       No Expenses this Month
      </p>
     ) : (
      <div>
       <ResponsiveContainer width='100%' height={250}>
        <PieChart>
         <Pie
          data={pieChartData}
          cx='50%'
          cy='50%'
          outerRadius={80}
          dataKey='value'
          fill='#8884d8'
          label={({ name, value }) => `${name} : Rs.${value.toFixed(2)}`}
         >
          {pieChartData.map((entry, index) => (
           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
         </Pie>
        </PieChart>
       </ResponsiveContainer>
      </div>
     )}
    </CardContent>
   </Card>
  </div>
 );
};

export default DashboardOverview;
