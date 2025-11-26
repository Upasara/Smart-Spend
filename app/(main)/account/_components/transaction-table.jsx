'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { categoryColor } from '@/data/categories';
import { format } from 'date-fns';
import {
 ChevronDown,
 ChevronUp,
 Clock,
 MoreHorizontal,
 RefreshCcw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const TransactionTable = ({ transactions }) => {
 const router = useRouter();
 const [selectedIds, setSelectedIds] = useState([]);
 const [sortConfig, setSortConfig] = useState({
  field: 'date',
  direction: 'desc',
 });

 //checkbox select handler
 const handleSelect = (id) => {
  setSelectedIds((current) =>
   current.includes(id)
    ? current.filter((item) => item != id)
    : [...current, id]
  );
 };

 //checkbox select all handler
 const handleSelectAll = () => {
  setSelectedIds((current) =>
   current.length === filteredTransactions.length
    ? []
    : filteredTransactions.map((tx) => tx.id)
  );
 };
 const filteredTransactions = transactions || [];
 const handleSort = (field) => {
  setSortConfig((current) => ({
   field,
   direction:
    current.field == field && current.direction === 'asc' ? 'desc' : 'asc',
  }));
 };

 const RECURRING_INTERVALS = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
 };

 return (
  <div className='mt-10'>
   {/* filters */}

   {/* transaction table*/}
   <div className='rounded-md border bg-white'>
    <Table>
     <TableHeader>
      <TableRow>
       <TableHead className='w-[50px]'>
        <Checkbox
         onCheckedChange={handleSelectAll}
         checked={
          selectedIds.length === filteredTransactions.length &&
          filteredTransactions.length > 0
         }
        />
       </TableHead>
       <TableHead className='cursor-pointer' onClick={() => handleSort('date')}>
        <div className='flex items-center'>
         Date
         {sortConfig.field === 'date' &&
          (sortConfig.direction === 'asc' ? (
           <ChevronUp className='ml-1 h-3 w-3' />
          ) : (
           <ChevronDown className='ml-1 h-3 w-3' />
          ))}
        </div>
       </TableHead>
       <TableHead>Description</TableHead>
       <TableHead
        className='cursor-pointer'
        onClick={() => handleSort('category')}
       >
        <div className='flex items-center'>
         Category
         {sortConfig.field === 'category' &&
          (sortConfig.direction === 'asc' ? (
           <ChevronUp className='ml-1 h-3 w-3' />
          ) : (
           <ChevronDown className='ml-1 h-3 w-3' />
          ))}
        </div>
       </TableHead>
       <TableHead
        className='cursor-pointer'
        onClick={() => handleSort('amount')}
       >
        <div className='flex items-center justify-end'>
         Amount{' '}
         {sortConfig.field === 'amount' &&
          (sortConfig.direction === 'asc' ? (
           <ChevronUp className='ml-1 h-3 w-3' />
          ) : (
           <ChevronDown className='ml-1 h-3 w-3' />
          ))}
        </div>
       </TableHead>
       <TableHead>Recurring</TableHead>
       <TableHead className='w-[50px]' />
      </TableRow>
     </TableHeader>
     <TableBody>
      {filteredTransactions?.length === 0 ? (
       <TableRow>
        <TableCell className='text-center text-muted-foreground' colSpan={7}>
         No Transactions Found
        </TableCell>
       </TableRow>
      ) : (
       filteredTransactions.map((transaction) => (
        <TableRow key={transaction.id}>
         <TableCell>
          <Checkbox
           onCheckedChange={() => handleSelect(transaction.id)}
           checked={selectedIds.includes(transaction.id)}
          />
         </TableCell>
         <TableCell>{format(new Date(transaction.date), 'PP')}</TableCell>
         <TableCell>{transaction.description}</TableCell>
         <TableCell className='uppercase'>
          <span
           style={{
            background: categoryColor[transaction.category],
           }}
           className='px-2 py-1 rounded text-white text-xs font-medium'
          >
           {transaction.category}
          </span>
         </TableCell>
         <TableCell
          className='text-right font-medium'
          style={{ color: transaction.type === 'EXPENSE' ? 'red' : 'green' }}
         >
          {transaction.type === 'EXPENSE' ? '-' : '+'} Rs.
          {transaction.amount.toFixed(2)}
         </TableCell>
         <TableCell>
          {transaction.isRecurring ? (
           <TooltipProvider>
            <Tooltip>
             <TooltipTrigger>
              <Badge className='gap-1'>
               <RefreshCcw className='h-3 w-3' />
               {RECURRING_INTERVALS[transaction.recurringInterval]}
              </Badge>
             </TooltipTrigger>
             <TooltipContent>
              <div className='text-xs'>
               <div>Next Date:</div>
               <div>
                {format(new Date(transaction.nextRecurringDate), 'PP')}
               </div>
              </div>
             </TooltipContent>
            </Tooltip>
           </TooltipProvider>
          ) : (
           <Badge variant='outline' className='gap-1'>
            <Clock className='h-3 w-3' /> One-time
           </Badge>
          )}
         </TableCell>
         <TableCell>
          <DropdownMenu>
           <DropdownMenuTrigger asChild>
            <Button variant='ghost'>
             <MoreHorizontal className='h-3 w-3' />
            </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent>
            <DropdownMenuLabel
             onClick={() =>
              router.push(`/transaction/create?edit=${transaction.id}`)
             }
            ></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
             className='text-destructive'
             onClick={() => deleteFn([transaction.id])}
            >
             Detele
            </DropdownMenuItem>
           </DropdownMenuContent>
          </DropdownMenu>
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
