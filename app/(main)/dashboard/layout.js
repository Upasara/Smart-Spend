import React, { Suspense } from 'react';
import DashboardPage from './page';
import { SyncLoader } from 'react-spinners';

const DashboardLayout = () => {
 return (
  <div className='p-5 pt-10'>
   <h1 className='text-3xl md:text-4xl font-semibold mb-5 text-shadow-xs text-green-600'>
    Dashboard
   </h1>
   <Suspense
    fallback={
     <div className='min-h-screen flex justify-center pt-20'>
      <SyncLoader width={'100%'} color='#16a34a' />
     </div>
    }
   >
    <DashboardPage />
   </Suspense>
  </div>
 );
};

export default DashboardLayout;
