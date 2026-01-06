import React from 'react';
import AddTransactionForm from '../_components/transaction-form';
import { defaultCategories } from '@/data/categories';
import { getUserAccounts } from '@/actions/dashboard';
import { getTransaction } from '@/actions/transaction';

const AddTransactionPage = async ({ searchParams }) => {
 const accounts = await getUserAccounts();
 const resolvedSearchParams = await searchParams;
 const editId = resolvedSearchParams?.edit;
 let initialData = null;

 if (editId) {
  const transaction = await getTransaction(editId);
  initialData = transaction;
 }

 return (
  <div className=' p-5  max-w-6xl'>
   <h1 className='text-5xl mb-8 font-semibold'>
    {editId ? 'Edit' : 'Add'} Transaction
   </h1>
   <AddTransactionForm
    accounts={accounts}
    categories={defaultCategories}
    editMode={!!editId}
    initialData={initialData}
   />
  </div>
 );
};

export default AddTransactionPage;
