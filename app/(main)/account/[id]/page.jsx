export const dynamic = 'force-dynamic';

import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import TransactionTable from '../_components/transaction-table';
import { BarLoader, SyncLoader } from 'react-spinners';
import AccountChart from '../_components/account-chart';

const AccountsPage = async ({ params }) => {
 const { id } = await params;
 const accountData = await getAccountWithTransactions(id);
 if (!accountData) {
  notFound();
 }

 const { transactions, ...account } = accountData;
 return (
  <div className=' p-5  pt-10'>
   <div className='flex items-center justify-between'>
    <div>
     <h1 className='uppercase text-3xl font-semibold text-green-600 text-shadow-xs'>
      {account.name}
     </h1>
     <p className='text-muted-foreground'>
      {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
     </p>
    </div>
    <div className='text-right'>
     <div className='text-xl md:text-2xl font-semibold'>
      <span className='text-base'>Rs.</span>
      {parseFloat(account.balance).toFixed(2)}
     </div>
     <p className='text-sm text-muted-foreground'>
      {account._count.transactions} Transaction
     </p>
    </div>
   </div>
   {/* chart */}
   <Suspense
    fallback={
     <div className='min-h-screen flex justify-center pt-20'>
      <SyncLoader width={'100%'} color='#16a34a' />
     </div>
    }
   >
    <AccountChart transactions={transactions} />
   </Suspense>
   {/* transaction table */}
   <Suspense
    fallback={
     <div className='min-h-screen flex justify-center pt-20'>
      <SyncLoader width={'100%'} color='#16a34a' />
     </div>
    }
   >
    <TransactionTable transactions={transactions} />
   </Suspense>
  </div>
 );
};

export default AccountsPage;
