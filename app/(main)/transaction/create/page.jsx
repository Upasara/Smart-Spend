import React from 'react';
import AddTransactionForm from '../_components/transaction-form';
import { defaultCategories } from '@/data/categories';
import { getUserAccounts } from '@/actions/dashboard';

const AddTransactionPage = async () => {
 const accounts = await getUserAccounts();
 return (
  <div className=' p-5  max-w-6xl'>
   <h1 className='text-5xl mb-8 font-semibold'>Add Transaction</h1>
   <AddTransactionForm accounts={accounts} categories={defaultCategories} />
  </div>
 );
};

export default AddTransactionPage;
