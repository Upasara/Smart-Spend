import FeatureCards from '@/components/landing/feature-cards';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/how-it-works';
import Preview from '@/components/landing/preview';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
 return (
  <div className='flex flex-col'>
   {/* hero */}
   <Hero />

   {/* feature cards*/}
   <FeatureCards />
   {/* preview */}
   <Preview />
   {/* how it works */}
   <HowItWorks />
  </div>
 );
}
