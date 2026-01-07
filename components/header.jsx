import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LOGO from '../public/logo.png';
import { Button } from './ui/button';
import { LayoutDashboard, LogIn, SquarePen } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';

const Header = async () => {
 await checkUser();
 return (
  <div className='fixed top-0 w-full bg-green-200/50 backdrop-blur-[2px] border-b z-50'>
   <nav className=' flex items-center justify-between px-3 py-1'>
    <Link href='/'>
     <Image src={LOGO} alt='LOGO' className='h-14 w-auto object-contain' />
    </Link>

    <div className='flex items-center gap-3'>
     <SignedIn>
      {/* dashboard */}
      <Link
       href='/dashboard'
       className='group flex items-center text-gray-700 hover:text-primary-black gap-2 duration-300'
      >
       <Button
        variant='outline'
        size='sm'
        className='hover:cursor-pointer hover:shadow-md'
       >
        <LayoutDashboard className='group-hover:-translate-y-0.5 duration-300' />
        <span className='hidden md:inline'>Dashboard</span>
       </Button>
      </Link>
      {/* transaction */}
      <Link
       href='/transaction/create'
       className='group flex items-center gap-2'
      >
       <Button size='sm' className='hover:cursor-pointer hover:shadow-md'>
        <SquarePen className='group-hover:-translate-y-0.5 duration-300' />
        <span className='hidden md:inline'>Transaction</span>
       </Button>
      </Link>
     </SignedIn>
     <SignedOut>
      <SignInButton forceRedirectUrl='/dashboard'>
       <Button
        variant='outline'
        size='sm'
        className='group hover:cursor-pointer hover:shadow-md duration-300'
       >
        LOGIN
        <LogIn className='group-hover:translate-x-0.5 duration-300' />
       </Button>
      </SignInButton>
     </SignedOut>
     <SignedIn>
      <UserButton
       appearance={{
        elements: {
         avatarBox: 'W-50',
        },
       }}
      />
     </SignedIn>
    </div>
   </nav>
  </div>
 );
};

export default Header;
