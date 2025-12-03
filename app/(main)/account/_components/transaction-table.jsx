'use client';

import { bulkDeleteTransactions } from '@/actions/accounts';
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
import { Input } from '@/components/ui/input';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
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
import useFetch from '@/hooks/use-fetch';
import { format } from 'date-fns';
import {
 ChevronDown,
 ChevronUp,
 Clock,
 MoreHorizontal,
 RefreshCcw,
 Search,
 Trash,
 X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';

const TransactionTable = ({ transactions }) => {
 const router = useRouter();
 const [searchTerm, setSearchTerm] = useState('');
 const [typeFilter, setTypeFilter] = useState('');
 const [recurringFilter, setRecurringFilter] = useState('');

 const [selectedIds, setSelectedIds] = useState([]);
 const [sortConfig, setSortConfig] = useState({
  field: 'date',
  direction: 'desc',
 });

 const {
  loading: deleteLoading,
  fn: deleteFn,
  data: deleted,
 } = useFetch(bulkDeleteTransactions);

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
 const filteredTransactions = useMemo(() => {
  let result = [...transactions];

  //search filter
  if (searchTerm) {
   const lowerTerm = searchTerm.toLowerCase();
   result = result.filter((transaction) =>
    transaction.description?.toLowerCase().includes(lowerTerm)
   );
  }

  //recurring filter
  if (recurringFilter) {
   result = result.filter((transaction) => {
    if (recurringFilter === 'recurring') return transaction.isRecurring;
    return !transaction.isRecurring;
   });
  }

  //tyoe filter
  if (typeFilter) {
   result = result.filter((transaction) => transaction.type === typeFilter);
  }

  result.sort((a, b) => {
   let comparison = 0;
   switch (sortConfig.field) {
    case 'date':
     comparison = new Date(a.date) - new Date(b.date);
     break;

    case 'category':
     comparison = a.category.localeCompare(b.category);
     break;

    case 'amount':
     comparison = a.amount - b.amount;
     break;

    default:
     comparison = 0;
   }

   return sortConfig.direction === 'asc' ? comparison : -comparison;
  });

  return result;
 }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);
 const handleSort = (field) => {
  setSortConfig((current) => ({
   field,
   direction:
    current.field == field && current.direction === 'asc' ? 'desc' : 'asc',
  }));
 };

 const handleBulkdDelete = async () => {
  if (
   !window.confirm(
    `Are you sure you want to delete ${selectedIds.length} transactions?`
   )
  ) {
   return;
  }
  deleteFn(selectedIds);
 };

 useEffect(() => {
  if (deleted && !deleteLoading) {
   toast.error('Transactions deleted successfully');
  }
 }, [deleted, deleteLoading]);

 const handleFilters = () => {
  setSearchTerm('');
  setTypeFilter('');
  setRecurringFilter('');
  setSelectedIds([]);
 };

 const RECURRING_INTERVALS = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
 };

 return (
  <div className='mt-5'>
   {deleteLoading && (
    <BarLoader className='mt-4' width={'100%'} color='#16a34a' />
   )}
   {/* filters */}
   <div className='flex flex-col md:flex-row gap-4 '>
    {/* search */}
    <div className='relative flex-1'>
     <Search className='absolute left-2 h-4 w-4 top-2.5 text-muted-foreground' />
     <Input
      className='pl-8'
      placeholder='Search Transactions...'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
     />
    </div>
    {/*  filters */}
    <div className='flex gap-4'>
     <Select value={typeFilter} onValueChange={setTypeFilter}>
      <SelectTrigger>
       <SelectValue placeholder='All Types' />
      </SelectTrigger>
      <SelectContent>
       <SelectItem value='INCOME'>INCOME</SelectItem>
       <SelectItem value='EXPENSE'>EXPENSE</SelectItem>
      </SelectContent>
     </Select>

     <Select
      value={recurringFilter}
      onValueChange={(value) => setRecurringFilter(value)}
     >
      <SelectTrigger>
       <SelectValue placeholder='All Transaction' />
      </SelectTrigger>
      <SelectContent>
       <SelectItem value='recurring'>Recurring only</SelectItem>
       <SelectItem value='non-recurring'>Non Recurring Only</SelectItem>
      </SelectContent>
     </Select>

     {selectedIds.length > 0 && (
      <div className='flex items-center gap-1'>
       <Button variant='destructive' size='sm' onClick={handleBulkdDelete}>
        <Trash className='h-3 w-3' />
        Delete Selected ({selectedIds.length})
       </Button>
      </div>
     )}

     {(searchTerm || typeFilter || recurringFilter) && (
      <Button
       variant='destructive'
       size='sm'
       onClick={handleFilters}
       title='clear filters'
      >
       <X className='h-3 w-3 ' />
      </Button>
     )}
    </div>
   </div>

   {/* transaction table*/}
   <div className='rounded-md border bg-white mt-4'>
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
            <DropdownMenuItem
             onClick={() =>
              router.push(`/transaction/create?edit=${transaction.id}`)
             }
            >
             Edit
            </DropdownMenuItem>
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
