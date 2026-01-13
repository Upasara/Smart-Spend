import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
 return (
  <div
   className=' relative items-center min-h-screen bg-cover bg-center bg-no-repeat '
   style={{ backgroundImage: "url('/hero.png" }}
  >
   <div className='flex flex-col z-10 relative min-h-screen bg-black/10 p-5 pt-30 items-center '>
    <h1 className='text-7xl  text-green-600 font-bold text-center'>
     Smart Spend
    </h1>
    <p className='text-lg mt-3 text-gray-600 font-mono text-center'>
     Smarter Way to Track Your Money
    </p>

    <Link href='/dashboard' className='mt-70 md:mt-10'>
     <Button
      variant='outline'
      className='group bg-white border-2 border-green-500 '
     >
      GET STARTED{' '}
      <ArrowRight className='group-hover:translate-x-1 duration-300 text-green-600' />
     </Button>
    </Link>
   </div>
  </div>
 );
};

export default Hero;
