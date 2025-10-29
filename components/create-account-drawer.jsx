'use client';

import React, { useEffect, useState } from 'react';
import {
 Drawer,
 DrawerClose,
 DrawerContent,
 DrawerHeader,
 DrawerTitle,
 DrawerTrigger,
} from './ui/drawer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '@/app/lib/schema';
import { Input } from './ui/input';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { createAccount } from '@/actions/dashboard';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CreateAccountDrawer = ({ children }) => {
 const [open, setOpen] = useState(false);

 const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
  watch,
  reset,
 } = useForm({
  resolver: zodResolver(accountSchema),
  defaultValues: {
   name: '',
   type: 'CURRENT',
   balance: '',
   isDefault: false,
  },
 });

 const {
  data: newAccount,
  error,
  fn: createAccountFn,
  loading: createAccountLoading,
 } = useFetch(createAccount);

 useEffect(() => {
  if (newAccount && !createAccountLoading) {
   toast.success('Account created successfully');
   reset();
   setOpen(false);
  }
 }, [createAccountLoading, newAccount]);

 useEffect(() => {
  if (error) {
   toast.error(error.message || 'Failed to create account !');
  }
 }, [error]);

 const onSubmit = async (data) => {
  await createAccountFn(data);
 };

 return (
  <Drawer open={open} onOpenChange={setOpen}>
   <DrawerTrigger asChild>{children}</DrawerTrigger>
   <DrawerContent>
    <DrawerHeader>
     <DrawerTitle>Are you absolutely sure?</DrawerTitle>
    </DrawerHeader>
    <div className='px-4 pb-4'>
     <form onSubmit={handleSubmit(onSubmit)}>
      {/* account name */}
      <div>
       <label htmlFor='name' className='text-sm font-semibold '>
        Account Name :
       </label>
       <Input
        id='name'
        placeholder='eg: Main Checking'
        className='mt-1'
        {...register('name')}
       />
       {errors.name && (
        <p className='text-sm text-red-700'>{errors.name.message}</p>
       )}
      </div>
      {/* account type */}
      <div className='mt-4'>
       <label htmlFor='type' className='text-sm font-semibold '>
        Account Type :
       </label>
       <Select
        fullWidth
        onValueChange={(value) => setValue('type', value)}
        defaultValue={watch('type')}
       >
        <SelectTrigger id='type' className='mt-1 w-full'>
         <SelectValue placeholder='Select Type' />
        </SelectTrigger>
        <SelectContent>
         <SelectItem value='CURRENT'>Current</SelectItem>
         <SelectItem value='SAVINGS'>Savings</SelectItem>
        </SelectContent>
       </Select>
       {errors.type && (
        <p className='text-sm text-red-700'>{errors.type.message}</p>
       )}
      </div>
      {/* account balance */}
      <div className='mt-4'>
       <label htmlFor='balance' className='text-sm font-semibold'>
        Balance
       </label>
       <Input
        id='balance'
        className='mt-1'
        type='number'
        step='0.01'
        placeholder='0.00'
        {...register('balance')}
       />
       {errors.balance && (
        <p className='text-sm text-red-700'> {errors.balance.message}</p>
       )}
      </div>
      {/* set as default */}
      <div className='mt-4 flex items-center justify-between rounded-lg border px-3 py-1'>
       <div>
        <label htmlFor='isDefault' className='text-sm font-semibold'>
         Set as Default :
        </label>
        <p className='text-xs text-muted-foreground'>
         This account will be selected by Default for transactions.
        </p>
       </div>
       <Switch
        id='isDefault'
        onCheckedChange={(checked) => setValue('isDefault', checked)}
        checked={watch('isDefault')}
       />
      </div>
      {/* close button */}
      <div className='mt-4 flex gap-4'>
       <Button type='submit' className='flex-1' disabled={createAccountLoading}>
        {createAccountLoading ? (
         <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
          Creating ...
         </>
        ) : (
         'Create Account'
        )}
       </Button>

       <DrawerClose asChild>
        <Button type='button' variant='outline' className='flex-1'>
         Cancel
        </Button>
       </DrawerClose>
      </div>
     </form>
    </div>
   </DrawerContent>
  </Drawer>
 );
};

export default CreateAccountDrawer;
