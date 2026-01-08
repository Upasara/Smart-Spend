'use client';

import { createTransaction, updateTransaction } from '@/actions/transaction';
import { transactionSchema } from '@/app/lib/schema';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import RecieptScanner from './reciept-scanner';

const AddTransactionForm = ({
 accounts,
 categories,
 editMode = false,
 initialData = null,
}) => {
 const router = useRouter();
 const searchParams = useSearchParams();
 const editId = searchParams?.get('edit');

 const {
  register,
  setValue,
  handleSubmit,
  formState: { errors },
  watch,
  getValues,
  reset,
 } = useForm({
  resolver: zodResolver(transactionSchema),
  defaultValues:
   editMode && initialData
    ? {
       type: initialData.type,
       amount: initialData.amount.toString(),
       description: initialData.description,
       accountId: initialData.accountId,
       category: initialData.category,
       date: new Date(initialData.date),
       isRecurring: initialData.isRecurring,
       ...(initialData.recurringInterval && {
        recurringInterval: initialData.recurringInterval,
       }),
      }
    : {
       type: 'EXPENSE',
       amount: '',
       description: '',
       accountId: accounts.find((ac) => ac.isDefault)?.id,
       date: new Date(),
       isRecurring: false,
      },
 });

 const {
  loading: transactionLoading,
  fn: transactionFn,
  data: transactionResult,
 } = useFetch(editMode ? updateTransaction : createTransaction);

 const type = watch('type');
 const isRecurring = watch('isRecurring');
 const date = watch('date');
 const selectedCategory = watch('category');

 const filteredCategories = categories.filter(
  (category) => category.type === type
 );

 const onSubmit = async (data) => {
  const formData = {
   ...data,
   amount: parseFloat(data.amount),
  };

  if (editMode) {
   transactionFn(editId, formData);
  } else {
   transactionFn(formData);
  }
 };

 useEffect(() => {
  if (!transactionResult) return;
  if (transactionResult?.success && !transactionLoading) {
   toast.success(
    editMode
     ? 'Transaction updated successfully'
     : 'Transaction created successfully'
   );
   reset();
   router.push(`/account/${transactionResult.data.accountId}`);
  } else {
   toast.error(transactionResult.error || 'Failed to create transaction !');
  }
 }, [transactionSchema, transactionLoading, editMode]);

 const handleSubmitComplete = (scannedData) => {
  if (scannedData) {
   setValue('amount', scannedData.amount.toString());
   setValue('date', new Date(scannedData.date));
   if (scannedData.description) {
    setValue('description', scannedData.description);
   }
   if (scannedData.category) {
    setValue('category', scannedData.category);
   }
  }
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   {/* AI reciept scanner */}
   {!editMode && <RecieptScanner onScanComplete={handleSubmitComplete} />}
   {/* manual data entry */}
   <div className='space-y-4'>
    <label>Type</label>
    <Select
     onValueChange={(value) => setValue('type', value)}
     defaultValue={type}
    >
     <SelectTrigger
      className='w-full focus:bg-white focus:border-green-300 
     focus-visible:ring-0 duration-300 mt-1 transition-all'
     >
      <SelectValue placeholder='Theme' />
     </SelectTrigger>
     <SelectContent className='border-green-300'>
      <SelectItem value='EXPENSE'>Expense</SelectItem>
      <SelectItem value='INCOME'>Income</SelectItem>
     </SelectContent>
    </Select>
    {errors.type && (
     <p className='text-xs text-red-600'>{errors.type.message}</p>
    )}
   </div>
   <div className='grid md:grid-cols-2 gap-5'>
    <div className='space-y-4'>
     <label>Amount</label>
     <Input
      type='number'
      step='0.01'
      placeholder='0.00'
      {...register('amount')}
      className='mt-1 focus:bg-white focus-visible:border-green-300
       focus-visible:ring-0 duration-300 transition-all'
     />
     {errors.amount && (
      <p className='text-xs text-red-600'>{errors.amount.message}</p>
     )}
    </div>
    <div className='space-y-4'>
     <label>Account</label>
     <Select
      onValueChange={(value) => setValue('accountId', value)}
      defaultValue={getValues('accountId')}
     >
      <SelectTrigger
       className='w-full  focus:bg-white focus:border-green-300 
     focus-visible:ring-0 duration-300 mt-1 transition-all '
      >
       <SelectValue placeholder='Select Account' />
      </SelectTrigger>
      <SelectContent className='border-green-300'>
       {accounts.map((account) => (
        <SelectItem key={account.id} value={account.id}>
         {account.name}
         <p className='text-xs'>
          (Rs.{parseFloat(account.balance).toFixed(2)})
         </p>
        </SelectItem>
       ))}
       <CreateAccountDrawer>
        <Button
         variant='ghost'
         className='w-full select-none items-center text-sm '
        >
         Create Account
        </Button>
       </CreateAccountDrawer>
      </SelectContent>
     </Select>
     {errors.type && (
      <p className='text-sm text-red-600'>{errors.type.message}</p>
     )}
    </div>
   </div>
   <div className='space-y-4'>
    <label>Category</label>
    <Select
     value={selectedCategory}
     onValueChange={(value) => setValue('category', value)}
    >
     <SelectTrigger
      className='w-full  focus:bg-white focus:border-green-300 
     focus-visible:ring-0 duration-300 mt-1 transition-all '
     >
      <SelectValue placeholder='Select category' />
     </SelectTrigger>
     <SelectContent className='border-green-300'>
      {filteredCategories.map((category) => (
       <SelectItem key={category.id} value={category.id}>
        {category.name}
       </SelectItem>
      ))}
     </SelectContent>
    </Select>
    {errors.category && (
     <p className='text-sm text-red-600'>{errors.category.message}</p>
    )}
   </div>
   <div className='mb-4'>
    <label>Date</label>
    <Popover>
     <PopoverTrigger asChild>
      <Button
       variant='outline'
       className='w-full pl-3 justify-between font-normal  focus:bg-white focus:border-green-300 
     focus-visible:ring-0 duration-300 mt-1 transition-all'
      >
       {date ? format(date, 'PPP') : <span>Pick a Date</span>}
       <CalendarIcon />
      </Button>
     </PopoverTrigger>
     <PopoverContent className='border-green-300'>
      <Calendar
       mode='single'
       selected={date}
       onSelect={(date) => setValue('date', date)}
       disabled={(date) => date > new Date() || date < new Date('1900-01-1')}
       initialFocus
      />
     </PopoverContent>
    </Popover>
    {errors.date && (
     <p className='text-sm text-red-600'>{errors.date.message}</p>
    )}
   </div>
   <div className='mb-6'>
    <label>Description</label>
    <Input
     placeholder='Enter description'
     {...register('description')}
     className='mt-1 focus:bg-white focus-visible:border-green-300
       focus-visible:ring-0 duration-300 transition-all '
    />
    {errors.description && (
     <p className='text-sm text-red-600'>{errors.description.message}</p>
    )}
   </div>
   <div className='flex items-center justify-between rounded-lg border p-3 mb-4'>
    <div className='space-y-0.5'>
     <label>Recurring Transaction</label>
     <p className='text-xs text-muted-foreground'>
      Set up a recurring schedule for this transaction
     </p>
    </div>
    <Switch
     checked={isRecurring}
     onCheckedChange={(checked) => setValue('isRecurring', checked)}
    />
   </div>
   {isRecurring && (
    <div className='space-y-6'>
     <label>Recurring Interval</label>
     <Select
      onValueChange={(value) => setValue('recurringInterval', value)}
      defaultValue={getValues('recurringInterval')}
     >
      <SelectTrigger
       className='w-full mt-1 focus:bg-white focus:border-green-300
       focus-visible:ring-0 duration-300 transition-all '
      >
       <SelectValue placeholder='Select Interval' />
      </SelectTrigger>
      <SelectContent className='border-green-300'>
       <SelectItem value='DAILY'>Daily</SelectItem>
       <SelectItem value='WEEKLY'>Weekly</SelectItem>
       <SelectItem value='MONTHLY'>Monthly</SelectItem>
       <SelectItem value='YEARLY'>Yearly</SelectItem>
      </SelectContent>
     </Select>
     {errors.recurringInterval && (
      <p className='text-xs text-red-600'>{errors.recurringInterval.message}</p>
     )}
    </div>
   )}
   <div className='grid grid-cols-2 gap-4'>
    <Button type='button' variant='outline' onClick={() => router.back()}>
     Cancel
    </Button>
    <Button type='submit' disabled={transactionLoading}>
     {transactionLoading ? (
      <>
       <Loader2 className='mr-2 h-4 w-4 animate-spin' />
       {editMode ? 'Updating...' : 'Creating...'}
      </>
     ) : editMode ? (
      'Update Transaction'
     ) : (
      'Create Transaction'
     )}
    </Button>
   </div>
  </form>
 );
};

export default AddTransactionForm;
