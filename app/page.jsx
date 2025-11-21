import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
 return (
  <div className='flex items-center justify-center mt-20'>
   <Link href='/dashboard'>
    <Button variant='outline' className='group bg-white'>
     GET STARTED{' '}
     <ArrowRight className='group-hover:translate-x-1 duration-300' />
    </Button>
   </Link>
  </div>
 );
}
