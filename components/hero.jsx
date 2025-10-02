'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

const HeroSection = () => {
 return (
  <div className='p-5'>
   <div className='p-0 md:p-10 container mx-auto text-center'>
    <h1 className='text-5xl md:text-7xl font-semibold gradient-title pb-5'>
     Smart Spend
    </h1>
    <p className=' text-lg text-gray-600  max-w-3xl mx-auto'>
     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam architecto
     dolore suscipit magni delectus aspernatur, consequuntur quam quibusdam
     fuga, alias illum. Adipisci excepturi qui quaerat odio molestias
     consequuntur ea odit.
    </p>
    <div className='mt-4 items-center justify-center '>
     <Link href='/dashboard'>
      <Button variant='outline'>Get Started</Button>
     </Link>
    </div>
    <div className='mt-10'>
     <div>
      <Image
       src='/banner.png'
       alt='banner'
       width={1080}
       height={720}
       priority
       className='rounded-lg shadow-xl border mx-auto'
      />
     </div>
    </div>
   </div>
  </div>
 );
};

export default HeroSection;
