import React from 'react';
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '../ui/card';
import { Brain, ChartColumnBig, RefreshCcw, Sparkles } from 'lucide-react';

const FeatureCards = () => {
 return (
  <div className='p-5'>
   <h1 className='text-3xl text-center mb-20 mt-10 font-semibold text-green-600 text-shadow-2xs'>
    Why Choose Smart Spend?
   </h1>
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-10'>
    <Card>
     <CardHeader className='flex items-center justify-between'>
      <CardTitle className='font-medium text-lg'>Smart Budgeting</CardTitle>
      <Brain className='text-pink-700' size={28} />
     </CardHeader>
     <CardContent>
      <CardDescription>
       Set monthly budgets and get notified before you overspend.
      </CardDescription>
     </CardContent>
    </Card>
    <Card>
     <CardHeader className='flex items-center justify-between'>
      <CardTitle className='font-medium text-lg'>
       Visual Expense Tracking
      </CardTitle>
      <ChartColumnBig className='text-blue-700' size={28} />
     </CardHeader>
     <CardContent>
      <CardDescription>
       See where your money goes with charts and breakdowns.
      </CardDescription>
     </CardContent>
    </Card>
    <Card>
     <CardHeader className='flex items-center justify-between'>
      <CardTitle className='font-medium text-lg'>Expense Automation</CardTitle>
      <RefreshCcw className='text-red-600' size={28} />
     </CardHeader>
     <CardContent>
      <CardDescription>
       Never forget subscriptions or monthly bills again.
      </CardDescription>
     </CardContent>
    </Card>
    <Card>
     <CardHeader className='flex items-center justify-between'>
      <CardTitle className='font-medium text-lg'>
       AI Financial Insights
      </CardTitle>
      <Sparkles className='text-violet-700' size={28} />
     </CardHeader>
     <CardContent>
      <CardDescription>
       Receive personalized tips to improve your spending habits.
      </CardDescription>
     </CardContent>
    </Card>
   </div>
  </div>
 );
};

export default FeatureCards;
