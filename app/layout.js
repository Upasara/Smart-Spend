import Header from '@/components/header';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import SmoothScrollProvider from '@/components/smooth-scroll';
import AOSProvider from '@/components/animation-scroll';

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
      <footer className='bg-green-400/50 border-t-green-500 p-5'>
       <div className='container mx-auto text-center text-gray-600 '>
        <p>Developed by SAM :)</p>
       </div>
      </footer>
     </SmoothScrollProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
