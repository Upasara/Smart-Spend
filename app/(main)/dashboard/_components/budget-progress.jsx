'use client';

import { Button } from '@/components/ui/button';
import {
 Card,
 CardDescription,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, Pencil, X } from 'lucide-react';
import React, { useState } from 'react';

const BudegetProgress = ({ initialBudget, currentExpenses }) => {
 const [isEditting, setIsEditting] = useState(false);
 const [newBudget, setNewBudget] = useState(
  initialBudget?.amount?.toString() || ''
 );

 const persentUsed = initialBudget
  ? (currentExpenses / initialBudget.amount) * 100
  : 0;

 const handleUpdateBudget = async () => {};
 const handleCancelEdit = () => {};

 return (
  <Card>
   <CardHeader>
    <CardTitle>Monthly Budget (Default Account)</CardTitle>
    <div>
     {isEditting ? (
      <div>
       <Input
        type='number'
        value={newBudget}
        onChange={(e) => setNewBudget(e.target.value)}
        placeholder='Enter new budget'
        autoFocus
       />
       <Button variant='ghost' size='icon' onClick={handleUpdateBudget}>
        <Check className='h-3 w-3 text-green-600' />
       </Button>
       <Button variant='ghost' size='icon' onClick={handleCancelEdit}>
        <X className='h-3  w-3 text-red-600' />
       </Button>
      </div>
     ) : (
      <>
       <CardDescription>
        {initialBudget
         ? `$${currentExpenses.toFixed(2)} of $${initialBudget.amount.toFixed(
            2
           )} spent`
         : 'No Budget Set'}
       </CardDescription>
       <Button
        variant='ghost'
        size='icon'
        onClick={() => setIsEditting(true)}
        className='h-4 w-4'
       >
        <Pencil className='h-3 w-3' />
       </Button>
      </>
     )}
    </div>
    <CardDescription></CardDescription>
   </CardHeader>
  </Card>
 );
};

export default BudegetProgress;
