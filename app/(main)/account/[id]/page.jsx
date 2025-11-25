import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React from 'react';

const AccountsPage = async ({ params }) => {
 const { id } = await params;
 const accountData = await getAccountWithTransactions(id);
 if (!accountData) {
  notFound();
 }

 const { transactions, ...account } = accountData;
 return (
  <div className=' px-5 flex items-center justify-between'>
   <div>
    <h1 className='uppercase text-3xl font-semibold'>{account.name}</h1>
    <p className='text-muted-foreground'>
     {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
    </p>
   </div>
   <div className='text-right'>
    <div className='text-xl font-semibold'>
     ${parseFloat(account.balance).toFixed(2)}
    </div>
    <p className='text-sm text-muted-foreground'>
     {account._count.transactions} Transaction
    </p>
   </div>
  </div>
 );
};

export default AccountsPage;
