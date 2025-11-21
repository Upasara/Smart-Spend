import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
 return (
  <div className='flex flex-col items-center justify-center min-h-screen'>
   <span className='text-6xl text-black animate-bounce font-semibold'>404</span>

   <span className='text-5xl text-gray-700 font-semibold'>NOT - FOUND</span>
   <div className='mt-20'>
    <Link href='/'>
     <Button variant='outline' size='lg'>
      Home
     </Button>
    </Link>
   </div>
  </div>
 );
};

export default NotFound;
