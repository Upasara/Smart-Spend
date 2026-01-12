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
    <h1 className='text-7xl text-green-600 font-bold'>Smart Spend</h1>
    <p className='text-lg mt-1 text-gray-500 font-mono'>
     Smarter Way to Track Your Money
    </p>
    <p>
     SmartSpend helps you manage expenses, automate recurring costs, and receive
     AI-powered insights to spend smarter every month.
    </p>
    <Link href='/dashboard'>
     <Button variant='outline' className='group bg-white'>
      GET STARTED{' '}
      <ArrowRight className='group-hover:translate-x-1 duration-300' />
     </Button>
    </Link>
   </div>
  </div>
 );
};

export default Hero;
