'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import React, { useMemo, useState } from 'react';
import {
 Bar,
 BarChart,
 CartesianGrid,
 Legend,
 ResponsiveContainer,
 Tooltip,
 XAxis,
 YAxis,
} from 'recharts';

const DATE_RANGES = {
 '7D': { label: 'Last 7 Days', days: 7 },
 '1M': { label: 'Last 1 Month', days: 30 },
 '3M': { label: 'Last 3 Months', days: 90 },
 '6M': { label: 'Last 6 Months', days: 180 },
 ALL: { label: 'All Time', days: null },
};

const AccountChart = ({ transactions }) => {
 const [dateRange, setDateRange] = useState('1M');

 const filteredData = useMemo(() => {
  const range = DATE_RANGES[dateRange];
  const now = new Date();
  const startDate = range.days
   ? startOfDay(subDays(now, range.days))
   : startOfDay(new Date(0));

  //filter transactions based on date range
  const filtered = transactions.filter(
   (tx) => new Date(tx.date) >= startDate && new Date(tx.date) <= endOfDay(now)
  );

  const grouped = filtered.reduce((acc, transaction) => {
   const date = format(new Date(transaction.date), 'MMM dd');

   if (!acc[date]) {
    acc[date] = { date, income: 0, expense: 0 };
   }

   if (transaction.type === 'INCOME') {
    acc[date].income += transaction.amount;
   } else {
    acc[date].expense += transaction.amount;
   }

   return acc;
  }, {});

  //convert to array and sort by date
  return Object.values(grouped).sort(
   (a, b) => new Date(a.date) - new Date(b.date)
  );
 }, [transactions, dateRange]);

 const totals = useMemo(() => {
  return filteredData.reduce(
   (acc, day) => ({
    income: acc.income + day.income,
    expense: acc.expense + day.expense,
   }),
   { income: 0, expense: 0 }
  );
 }, [filteredData]);

 return (
  <div className='mt-5'>
   <Card className=' hover:shadow-md hover:border-green-300 duration-300 border  border-green-200'>
    <CardHeader className='flex items-center justify-between pb-7 space-y-0'>
     <CardTitle>Transaction Overview</CardTitle>
     <Select defaultValue={dateRange} onValueChange={setDateRange}>
      <SelectTrigger className='border border-green-200 focus-visible:ring-0 focus-visible:border-green-300 hover:cursor-pointer'>
       <SelectValue placeholder='Select Range' />
      </SelectTrigger>
      <SelectContent className='border border-green-300'>
       {Object.entries(DATE_RANGES).map(([key, { label }]) => {
        return (
         <SelectItem key={key} value={key}>
          {label}
         </SelectItem>
        );
       })}
      </SelectContent>
     </Select>
    </CardHeader>
    <CardContent>
     <div className='flex justify-around mb-6 text-sm'>
      <div className='text-center'>
       <p className='text-muted-foreground'>Total Income</p>
       <p className='text-lg font-bold text-green-600'>
        Rs.{totals.income.toFixed(2)}
       </p>
      </div>
      <div className='text-center'>
       <p className='text-muted-foreground'>Total Expenses</p>
       <p className='text-lg font-bold text-red-600'>
        Rs.{totals.expense.toFixed(2)}
       </p>
      </div>
      <div className='text-center'>
       <p className='text-muted-foreground'>Net</p>
       <p
        className={`text-lg font-bold ${
         totals.income - totals.expense >= 0 ? 'text-green-600' : 'text-red-700'
        }`}
       >
        Rs.{(totals.income - totals.expense).toFixed(2)}
       </p>
      </div>
     </div>
     {/* Chart Placeholder */}
     <div>
      <ResponsiveContainer width='100%' height={300}>
       <BarChart
        data={filteredData}
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
       >
        <CartesianGrid strokeDasharray='3 3' vertical={false} />
        <XAxis dataKey='date' />
        <YAxis
         fontSize={12}
         tickLine={false}
         axisLine={false}
         tickFormatter={(value) => `Rs.${value}`}
        />
        <Tooltip wrapperClassName='rounded-md shadow-md' />
        <Legend />
        <Bar
         dataKey='income'
         name='Income'
         fill='#16a34a'
         radius={[4, 4, 0, 0]}
        />
        <Bar
         dataKey='expense'
         name='Expense'
         fill='#dc2626'
         radius={[4, 4, 0, 0]}
        />
       </BarChart>
      </ResponsiveContainer>
     </div>
    </CardContent>
   </Card>
  </div>
 );
};

export default AccountChart;
