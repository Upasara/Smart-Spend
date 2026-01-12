import { SignUp } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
 return (
  <div className='flex justify-center items-center min-h-screen pt-20'>
   <SignUp />
  </div>
 );
};

export default Page;
