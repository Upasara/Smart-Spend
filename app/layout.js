import Header from '@/components/header';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import SmoothScrollProvider from '@/components/smooth-scroll';
import AOSProvider from '@/components/animation-scroll';
import Link from 'next/link';
import {
 Facebook,
 FacebookIcon,
 InstagramIcon,
 Linkedin,
 LinkedinIcon,
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
 title: 'Smart Spend',
 description: 'Developed by Upasara',
};

export default function RootLayout({ children }) {
 return (
  <ClerkProvider>
   <html lang='en' className='scroll-smooth'>
    <body className={`${inter.className} bg-primary-white`}>
     <SmoothScrollProvider>
      <AOSProvider />
      {/* header */}
      <Header />
      <main className='min-h-screen '>{children}</main>
      <Toaster richColors />
      {/* footer */}
      <footer className='grid grid-cols-1 md:grid-cols-3 items-center  bg-green-400/50 border-t-green-500 p-5'>
       <div className='text-center md:text-left text-gray-800 font-semibold text-lg'>
        SmartSpend © 2026
       </div>
       <div className='  text-center text-gray-600 text-sm md:text-base'>
        <p>Developed by Upasara</p>
       </div>
       <div className='flex items-center justify-center md:justify-end gap-2 mt-3 md:mt-0'>
        <Link href='#'>
         <FacebookIcon className='text-blue-600' />
        </Link>
        <Link href='#'>
         <InstagramIcon className='text-pink-600' />
        </Link>
        <Link href='#'>
         <LinkedinIcon className='text-blue-600' />
        </Link>
       </div>
      </footer>
     </SmoothScrollProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
