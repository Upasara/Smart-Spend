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
  <div className=' p-5  max-w-4xl flex flex-col mx-auto pt-10'>
   <h1 className='text-3xl md:text-4xl mb-8 font-semibold text-center text-green-600 text-shadow-xs'>
    {editId ? 'Edit' : 'Add'} Transaction
   </h1>
   <div>
    <AddTransactionForm
     accounts={accounts}
     categories={defaultCategories}
     editMode={!!editId}
     initialData={initialData}
    />
   </div>
  </div>
 );
};

export default AddTransactionPage;
