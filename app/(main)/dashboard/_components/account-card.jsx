'use client';

import { updateDefaultAccount } from '@/actions/accounts';
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const AccountCard = ({ account }) => {
 const { id, name, type, balance, isDefault } = account;

 const {
  loading: updateDefaultLoading,
  fn: updateDefaultFn,
  data: updateAccount,
  error,
 } = useFetch(updateDefaultAccount);

 const handleDefaultChange = async (e) => {
  e.preventDefault();

  if (!isDefault && updateDefaultLoading) {
   toast.warning('You need atleast 1 default account !');
  }

  await updateDefaultFn(id);
 };

 useEffect(() => {
  if (updateAccount?.success) {
   toast.success('Default account updated successfully');
  }
 }, [updateAccount, updateDefaultLoading]);

 useEffect(() => {
  if (error) {
   toast.error(error.message || 'Failed to update default account !');
  }
 }, [error]);

 return (
  <Card
   className='hover:shadow-md transition-all group relative
   border border-green-200 hover:-translate-y-0.5 hover:border-green-300 duration-300 '
  >
   <Link href={`/account/${id}`}>
    <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
     <CardTitle className='uppercase text-sm font-medium'>{name}</CardTitle>
     <Switch
      checked={isDefault}
      onClick={handleDefaultChange}
      disabled={updateDefaultLoading}
     />
    </CardHeader>
    <CardContent>
     <div className='text-2xl font-bold'>
      Rs.{parseFloat(balance).toFixed(2)}
     </div>
     <p className='text-xs text-muted-foreground '>
      {type.charAt(0) + type.slice(1).toLowerCase()} Account
     </p>
    </CardContent>
    <CardFooter className='flex justify-between text-sm text-muted-foreground pt-2'>
     <div className='flex items-center'>
      <ArrowUpRight className='mr-1 h-3 w-3 text-green-500' /> Income
     </div>
     <div className='flex items-center'>
      <ArrowDownRight className='mr-1 h-3 w-3 text-red-500' /> Expenses
     </div>
    </CardFooter>
   </Link>
  </Card>
 );
};

export default AccountCard;
