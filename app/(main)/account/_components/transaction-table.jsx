'use client';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table';
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import React from 'react';

const TransactionTable = ({ transactions }) => {
 const filteredAndSortedTransactions = transactions;
 const handleSort = () => {};

 return (
  <div className='space-y-4'>
   <div className='rounded-md border'>
    {/* transactions */}
    <Table>
     <TableCaption>A list of your recent invoices</TableCaption>
     <TableHeader>
      <TableRow>
       <TableHead className='w-[50px]'>
        <Checkbox />
       </TableHead>
       <TableHead className='cursor-pointer' onClick={() => handleSort('date')}>
        <div className='flex items-center'>Date</div>
       </TableHead>
       <TableHead
        className='cursor-pointer'
        onClick={() => handleSort('description')}
       >
        <div className='flex items-center'>Description</div>
       </TableHead>
       <TableHead
        className='cursor-pointer'
        onClick={() => handleSort('category')}
       >
        <div className='flex items-center'>Category</div>
       </TableHead>
       <TableHead
        className='cursor-pointer'
        onClick={() => handleSort('amount')}
       >
        <div className='flex items-center justify-end'>Amount</div>
       </TableHead>
       <TableHead>Recurring</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      {filteredAndSortedTransactions.length === 0 ? (
       <TableRow>
        <TableCell colSpan={7} className='text-center text-muted-foreground'>
         No Transaction Found !
        </TableCell>
       </TableRow>
      ) : (
       filteredAndSortedTransactions.map((transaction) => (
        <TableRow key={transaction.id}>
         <TableCell>
          <Checkbox />
         </TableCell>
         <TableCell>{format(new Date(transaction.date), 'PP')}</TableCell>
         <TableCell>{transaction.description}</TableCell>
         <TableCell className='uppercase'>
          <span
           style={{ background: categoryColors[transaction.category] }}
           className='px-2 py-1 rounded-md text-white text-xs'
          >
           {transaction.category}
          </span>
         </TableCell>
         <TableCell
          className='text-right font-medium'
          style={{ color: transaction.type === 'EXPENSE' ? 'red' : 'green' }}
         >
          {transaction.type === 'EXPENSE' ? '- ' : '+ '}Rs.
          {transaction.amount}
         </TableCell>
         <TableCell>
          {transaction.isRecurring ? (
           <TooltipProvider>
            <Tooltip>
             <TooltipTrigger>Hover</TooltipTrigger>
             <TooltipContent>
              <p>Add to Library</p>
             </TooltipContent>
            </Tooltip>
           </TooltipProvider>
          ) : (
           <Badge variant='outline' className='gap-1'>
            <Clock className='h-3 w-3' />
            one-time
           </Badge>
          )}
         </TableCell>
        </TableRow>
       ))
      )}
     </TableBody>
    </Table>
   </div>
  </div>
 );
};

export default TransactionTable;
