import {
 SignedIn,
 SignedOut,
 SignInButton,
 SignUpButton,
 UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';

const header = async () => {
 await checkUser();
 return (
  <div className='fixed top-0 w-full bg-white/50 backdrop-blur-[2px] z-50 border-b shadow-md'>
   <nav className='container mx-auto p-4 flex items-center justify-between'>
    <Link href='/'>
     <Image
      src={'/logo.png'}
      alt='logo'
      height={60}
      width={60}
      className='h-10 w-auto object-contain'
     />
    </Link>

    <div className='flex items-center space-x-4'>
     <SignedIn>
      {/* dashboard button */}
      <Link
       href='/dashboard'
       className='text-gray-600 hover:text-blue-600 flex items-center gap-2'
      >
       <Button variant='outline'>
        <LayoutDashboard />
        <span className='hidden md:inline'>Dashboard</span>
       </Button>
      </Link>
      {/* transaction button */}
      <Link href='/transaction/create' className='flex items-center gap-2'>
       <Button variant='outline'>
        <PenBox />
        <span className='hidden md:inline'>Dashboard</span>
       </Button>
      </Link>
     </SignedIn>
     <SignedOut>
      <SignInButton forceRedirectUrl='/dashboard'>
       <Button variant='outline'>Login</Button>
      </SignInButton>
     </SignedOut>
     <SignedIn>
      <UserButton />
     </SignedIn>
    </div>
   </nav>
  </div>
 );
};

export default header;
