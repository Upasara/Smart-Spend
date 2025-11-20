import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
 return (
  <div className='flex items-center justify-center mt-20'>
   <Button variant='outline' className='group bg-white'>
    GET STARTED{' '}
    <ArrowRight className='group-hover:translate-x-1 duration-300' />
   </Button>
  </div>
 );
}
