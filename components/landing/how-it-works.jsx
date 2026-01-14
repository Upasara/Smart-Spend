import React from 'react';
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '../ui/card';
import Image from 'next/image';

const HowItWorks = () => {
 return (
  <div className='p-5'>
   <h1 className='text-2xl md:text-3xl text-center mb-10 mt-8 font-semibold text-green-600 text-shadow-2xs '>
    How Smart Spend Works
   </h1>
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-4 lg:gap-16 px-0 md:px-0 lg:px-7  mb-0 md:mb-0 lg:mb-15'>
    <Card data-aos='zoom-in' className='border border-green-400'>
     <CardHeader className='flex justify-center items-center h-[150px]'>
      <Image src='/sign-up.png' width={150} height={200} alt='sign-up' />
     </CardHeader>
     <CardContent>
      <CardTitle className='font-medium text-lg text-center'>
       Sign up Securely
      </CardTitle>
      <CardDescription className='text-[15px] text-center mt-2'>
       Log in using email or social accounts with Clerk authentication.
      </CardDescription>
     </CardContent>
    </Card>
    <Card data-aos='zoom-in' className='border border-green-400'>
     <CardHeader className='flex justify-center items-center h-[150px]'>
      <Image
       src='/add-transaction.png'
       width={150}
       height={100}
       alt='sign-up'
      />
     </CardHeader>
     <CardContent>
      <CardTitle className='font-medium text-lg text-center'>
       Add Accounts & Transactions
      </CardTitle>
      <CardDescription className='text-[15px] text-center mt-2'>
       Manually add expenses or scan receipts using AI.
      </CardDescription>
     </CardContent>
    </Card>
    <Card data-aos='zoom-in' className='border border-green-400'>
     <CardHeader className='flex justify-center items-center h-[150px]'>
      <Image src='/set-budget.png' width={150} height={100} alt='sign-up' />
     </CardHeader>
     <CardContent>
      <CardTitle className='font-medium text-lg text-center'>
       Set Budgets
      </CardTitle>
      <CardDescription className='text-[15px] text-center mt-2'>
       Define monthly budgets for better control.
      </CardDescription>
     </CardContent>
    </Card>
    <Card data-aos='zoom-in' className='border border-green-400'>
     <CardHeader className='flex justify-center items-center h-[150px]'>
      <Image src='/get-insight.png' width={150} height={100} alt='sign-up' />
     </CardHeader>
     <CardContent>
      <CardTitle className='font-medium text-lg text-center'>
       Get Insights Automatically
      </CardTitle>
      <CardDescription className='text-[15px] text-center mt-2'>
       Receive alerts, reports, and smart suggestions by email.
      </CardDescription>
     </CardContent>
    </Card>
   </div>
  </div>
 );
};

export default HowItWorks;
