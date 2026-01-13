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
   <h1>How Smart Spend Works</h1>
   <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10'>
    <Card>
     <CardHeader className='flex justify-center items-center'>
      <Image src='/sign-up.png' width={200} height={100} alt='sign-up' />
     </CardHeader>
     <CardContent>
      <CardTitle>Sign up Securely</CardTitle>
      <CardDescription>
       Log in using email or social accounts with Clerk authentication.
      </CardDescription>
     </CardContent>
    </Card>
    <Card>
     <CardHeader>
      <Image src='/sign-up.png' width={200} height={150} alt='sign-up' />
     </CardHeader>
     <CardContent>
      <CardTitle>Sign up Securely</CardTitle>
      <CardDescription>
       Log in using email or social accounts with Clerk authentication.
      </CardDescription>
     </CardContent>
    </Card>
    <Card>
     <CardHeader>
      <Image src='/sign-up.png' width={200} height={100} alt='sign-up' />
     </CardHeader>
     <CardContent>
      <CardTitle>Sign up Securely</CardTitle>
      <CardDescription>
       Log in using email or social accounts with Clerk authentication.
      </CardDescription>
     </CardContent>
    </Card>
    <Card>
     <CardHeader>
      <Image src='/sign-up.png' width={200} height={100} alt='sign-up' />
     </CardHeader>
     <CardContent>
      <CardTitle>Sign up Securely</CardTitle>
      <CardDescription>
       Log in using email or social accounts with Clerk authentication.
      </CardDescription>
     </CardContent>
    </Card>
   </div>
  </div>
 );
};

export default HowItWorks;
