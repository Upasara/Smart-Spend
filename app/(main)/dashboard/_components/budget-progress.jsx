'use client';

import { updateBudget } from '@/actions/budget';
import { Button } from '@/components/ui/button';
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import useFetch from '@/hooks/use-fetch';
import { Check, Pencil, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const BudegetProgress = ({ initialBudget, currentExpenses }) => {
 const [isEditting, setIsEditting] = useState(false);
 const [newBudget, setNewBudget] = useState(
  initialBudget?.amount?.toString() || ''
 );

 const persentUsed = initialBudget
  ? (currentExpenses / initialBudget.amount) * 100
  : 0;

 const {
  loading: isLoading,
  fn: updateBudgetFn,
  data: updatedBudget,
  error,
 } = useFetch(updateBudget);

 const handleUpdateBudget = async () => {
  const amount = parseFloat(newBudget);
  if (isNaN(amount) || amount <= 0) {
   toast.error('Please enter a valid budget amount !');
   return;
  }

  await updateBudgetFn(amount);
 };

 useEffect(() => {
  if (updatedBudget?.success) {
   setIsEditting(false);
   toast.success('Budget updated successfully');
  }
 }, [updatedBudget]);

 useEffect(() => {
  if (error) {
   toast.error(error.message || 'Error updating budget !');
  }
 }, []);

 const handleCancelEdit = () => {
  setNewBudget(initialBudget?.amount?.toString() || '');
  setIsEditting(false);
 };

 return (
  <Card className='hover:-translate-y-0.5 hover:shadow-md hover:border-green-300 duration-300 border  border-green-200'>
   <CardHeader className='flex flex-row items-center justify-between'>
    <CardTitle className='text-lg font-medium'>
     Monthly Budget ( Default Account )
    </CardTitle>
    <div>
     {isEditting ? (
      <div className='flex items-center gap-2'>
       <Input
        type='number'
        value={newBudget}
        onChange={(e) => setNewBudget(e.target.value)}
        placeholder='Enter new budget'
        className='w-32'
        autoFocus
        disabled={isLoading}
       />
       <Button
        variant='ghost'
        size='icon'
        onClick={handleUpdateBudget}
        disabled={isLoading}
       >
        <Check className='h-3 w-3 text-green-600' />
       </Button>
       <Button
        variant='ghost'
        size='icon'
        onClick={handleCancelEdit}
        disabled={isLoading}
       >
        <X className='h-3  w-3 text-red-600' />
       </Button>
      </div>
     ) : (
      <div className='flex flex-col items-end'>
       <CardDescription>
        {initialBudget
         ? `Rs.${currentExpenses.toFixed(2)} of Rs.${initialBudget.amount.toFixed(
            2
           )} spent`
         : 'No Budget Set'}
       </CardDescription>
       <Button
        variant='ghost'
        size='icon'
        onClick={() => setIsEditting(true)}
        className='h-6 w-6 hover:cursor-pointer'
       >
        <Pencil className='h-3 w-3 ' />
       </Button>
      </div>
     )}
    </div>
   </CardHeader>
   <CardContent>
    {initialBudget && (
     <div>
      <Progress
       value={persentUsed}
       extraStyles={`${
        persentUsed >= 90
         ? 'bg-red-600'
         : persentUsed >= 75
           ? 'bg-yellow-600'
           : 'bg-green-600'
       }`}
      />
      <p className='text-xs text-muted-foreground text-right mt-1 '>
       {persentUsed.toFixed(1)}% used{' '}
      </p>
     </div>
    )}
   </CardContent>
  </Card>
 );
};

export default BudegetProgress;
