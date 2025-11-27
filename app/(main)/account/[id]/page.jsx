import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import TransactionTable from '../_components/transaction-table';
import { BarLoader } from 'react-spinners';

const AccountsPage = async ({ params }) => {
 const { id } = await params;
 const accountData = await getAccountWithTransactions(id);
 if (!accountData) {
  notFound();
 }

 const { transactions, ...account } = accountData;
 return (
  <div className=' p-5  '>
   <div className='flex items-center justify-between'>
    <div>
     <h1 className='uppercase text-3xl font-semibold'>{account.name}</h1>
     <p className='text-muted-foreground'>
      {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
     </p>
    </div>
    <div className='text-right'>
     <div className='text-xl font-semibold'>
      Rs.{parseFloat(account.balance).toFixed(2)}
     </div>
     <p className='text-sm text-muted-foreground'>
      {account._count.transactions} Transaction
     </p>
    </div>
   </div>
   {/* transaction table */}
   <Suspense
    fallback={<BarLoader className='mt-3' width={'100%'} color='#16a34a' />}
   >
    <TransactionTable transactions={transactions} />
   </Suspense>
  </div>
 );
};

export default AccountsPage;
