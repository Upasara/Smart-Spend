'use client';

import { createTransaction } from '@/actions/transaction';
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
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const AddTransactionForm = ({ accounts, categories }) => {
 const router = useRouter();
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
  defaultValues: {
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
 } = useFetch(createTransaction);

 const type = watch('type');
 const isRecurring = watch('isRecurring');
 const date = watch('date');

 const filteredCategories = categories.filter(
  (category) => category.type === type
 );

 const onSubmit = async (data) => {
  const formData = {
   ...data,
   amount: parseFloat(data.amount),
  };
  transactionFn(formData);
 };

 useEffect(() => {
  if (transactionResult?.success && !transactionLoading) {
   toast.success('Transaction created successfully !');
   reset();
   router.push(`/account/${transactionResult.data.accountId}`);
  } else {
   toast.error(transactionResult.error);
  }
 }, [transactionSchema, transactionLoading]);

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   {/* AI reciept scanner */}
   <div className='space-y-2'>
    <label>Type</label>
    <Select
     onValueChange={(value) => setValue('type', value)}
     defaultValue={type}
    >
     <SelectTrigger className='w-full'>
      <SelectValue placeholder='Theme' />
     </SelectTrigger>
     <SelectContent>
      <SelectItem value='EXPENSE'>Expense</SelectItem>
      <SelectItem value='INCOME'>Income</SelectItem>
     </SelectContent>
    </Select>
    {errors.type && (
     <p className='text-xs text-red-600'>{errors.type.message}</p>
    )}
   </div>
   <div className='grid md:grid-cols-2 gap-5'>
    <div className='space-y-2'>
     <label>Amount</label>
     <Input
      type='number'
      step='0.01'
      placeholder='0.00'
      {...register('amount')}
     />
     {errors.amount && (
      <p className='text-xs text-red-600'>{errors.amount.message}</p>
     )}
    </div>
    <div className='space-y-2'>
     <label>Account</label>
     <Select
      onValueChange={(value) => setValue('accountId', value)}
      defaultValue={getValues('accountId')}
     >
      <SelectTrigger className='w-full'>
       <SelectValue placeholder='Select Account' />
      </SelectTrigger>
      <SelectContent>
       {accounts.map((account) => (
        <SelectItem key={account.id} value={account.id}>
         {account.name}(${parseFloat(account.balance).toFixed(2)})
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
   <div className='space-y-2'>
    <label>Category</label>
    <Select
     onValueChange={(value) => setValue('category', value)}
     defaultValue={getValues('category')}
    >
     <SelectTrigger>
      <SelectValue placeholder='Select category' />
     </SelectTrigger>
     <SelectContent>
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
   <div className='mb-2'>
    <label>Date</label>
    <Popover>
     <PopoverTrigger asChild>
      <Button
       variant='outline'
       className='w-full pl-3 justify-between font-normal'
      >
       {date ? format(date, 'PPP') : <span>Pick a Date</span>}
       <CalendarIcon />
      </Button>
     </PopoverTrigger>
     <PopoverContent>
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
   <div className='mb-4'>
    <label>Description</label>
    <Input placeholder='Enter description' {...register('description')} />
    {errors.description && (
     <p className='text-sm text-red-600'>{errors.description.message}</p>
    )}
   </div>
   <div className='flex items-center justify-between rounded-lg border p-3 mb-2'>
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
    <div className='space-y-2'>
     <label>Recurring Interval</label>
     <Select
      onValueChange={(value) => setValue('recurringInterval', value)}
      defaultValue={getValues('recurringInterval')}
     >
      <SelectTrigger className='w-full'>
       <SelectValue placeholder='Select Interval' />
      </SelectTrigger>
      <SelectContent>
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
     Create Transaction
    </Button>
   </div>
  </form>
 );
};

export default AddTransactionForm;
