import HeroSection from '@/components/hero';
import { Card, CardContent } from '@/components/ui/card';
import {
 featuresData,
 howItWorksData,
 statusData,
 testimonialsData,
} from '@/data/landing';
import Image from 'next/image';

export default function Home() {
 return (
  <div className='mt-20'>
   <HeroSection />
   {/* status section */}
   <section className='bg-secondary-bg py-10 px-5 mt-8'>
    <div className='container mx-auto'>
     <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
      {statusData.map((status, i) => (
       <div key={i}>
        <div className='text-2xl font-bold text-secondary-main '>
         {status.value}
        </div>
        <div className='text-secondary-text'>{status.label}</div>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* features section */}
   <section className='py-10 px-5 mt-8'>
    <div className='container mx-auto'>
     <h2 className='text-2xl font-semibold text-center text-shadow-2xs'>
      Everything you need to manage your Finances
     </h2>
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
      {featuresData.map((feature, i) => (
       <Card key={i} className='p-6'>
        <CardContent className='space-y-3'>
         {feature.icon}
         <h3 className='font-semibold text-lg '>{feature.title}</h3>
         <p className='text-secondary-text text-sm'>{feature.description}</p>
        </CardContent>
       </Card>
      ))}
     </div>
    </div>
   </section>

   {/* how it works section */}
   <section className='py-10 px-5 bg-secondary-bg mt-8'>
    <div className='container mx-auto'>
     <h2 className='text-2xl font-semibold text-center text-shadow-2xs'>
      How It Works
     </h2>
     <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
      {howItWorksData.map((works, i) => (
       <div key={i} className='text-center '>
        <div className='bg-primary-bg rounded-full flex items-center justify-center mx-auto w-14 h-14 mb-3'>
         {works.icon}
        </div>
        <h3 className='font-semibold text-lg'>{works.title}</h3>
        <p className='text-sm text-gray-600'>{works.description}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* testimonials section */}
   <section className='py-10 px-5 mt-8'>
    <div className='container mx-auto '>
     <h2 className='text-2xl font-semibold text-center text-shadow-2xs'>
      What Our User Say
     </h2>
     <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
      {testimonialsData.map((testimonials, i) => (
       <Card key={i} className='p-6'>
        <CardContent className='space-y-3'>
         <div className='flex items-center space-x-2 '>
          <Image
           src={testimonials.image}
           alt={testimonials.name}
           width={50}
           height={50}
           className='rounded-full h-10 w-10 object-cover'
          />
          <div>
           <p className='text-sm font-semibold'>{testimonials.name}</p>
           <p className='text-xs  text-secondary-text'>{testimonials.role}</p>
          </div>
         </div>
         <p className='text-sm text-primary-text'>{testimonials.feedback}</p>
        </CardContent>
       </Card>
      ))}
     </div>
    </div>
   </section>
  </div>
 );
}
