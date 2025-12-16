'use server';

import { aj } from '@/lib/arcjet';
import { db } from '@/lib/prisma';
import { request } from '@arcjet/next';
import { auth } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { revalidatePath } from 'next/cache';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const serializedAmount = (obj) => ({
 ...obj,
 amount: obj.amount.toNumber(),
});

export async function createTransaction(data) {
 try {
  const { userId } = await auth();
  if (!userId) {
   throw new Error('Unauthorized !');
  }

  //get request data for Arcjet
  const req = await request();
  const decision = await aj.protect(req, {
   userId,
   requested: 1,
  });

  if (decision.isDenied()) {
   if (decision.reason.isRateLimit()) {
    const { remaining, reset } = decision.reason;
    console.error({
     code: 'RATE_LIMITING_EXCEEDE',
     details: {
      remaining,
      resetInSeconds: reset,
     },
    });

    return {
     success: false,
     error: 'Too many requests. Please try again later !',
    };
   }

   throw new Error('Request Blocked !');
  }

  const user = await db.user.findUnique({
   where: { clerkUserId: userId },
  });
  if (!user) {
   throw new Error('User not found !');
  }

  const account = await db.account.findUnique({
   where: {
    id: data.accountId,
    userId: user.id,
   },
  });

  if (!account) {
   throw new Error('Account not found !');
  }

  const balanceChange = data.type === 'EXPENSE' ? -data.amount : data.amount;
  const newBalance = account.balance.toNumber() + balanceChange;

  const transaction = await db.$transaction(async (tx) => {
   const newTransaction = await tx.transaction.create({
    data: {
     ...data,
     userId: user.id,
     nextRecurringDate:
      data.isRecurring && data.recurringInterval
       ? calculateNextRecurringDate(data.date, data.recurringInterval)
       : null,
    },
   });
   await tx.account.update({
    where: { id: data.accountId },
    data: { balance: newBalance },
   });
   return newTransaction;
  });

  revalidatePath('/dashboard');
  revalidatePath(`/account/${transaction.accountId}`);

  return { success: true, data: serializedAmount(transaction) };
 } catch (error) {
  return { success: false, error: error.message };
 }
}

//helper function to calculate next recurring date
function calculateNextRecurringDate(startDate, interval) {
 const date = new Date(startDate);

 switch (interval) {
  case 'DAILY':
   date.setDate(date.getDate() + 1);
   break;
  case 'WEEKLY':
   date.setDate(date.getDate() + 7);
   break;
  case 'MONTHLY':
   date.setDate(date.getMonth() + 1);
   break;
  case 'YEARLY':
   date.setDate(date.getFullYear() + 1);
   break;
 }

 return date;
}

export async function scanReciept(file) {
 try {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  //convert file to array buffer
  const arrayBuffer = await file.arrayBuffer();
  //convert array buffer to base64
  const base64String = Buffer.from(arrayBuffer).toString('base64');
  const prompt = `Analyze this reciept image and extract the following information in JSON format:
  - Total amount (just the number)
  - Date (in ISO format)
  - Description or items purchased (brief summary)
  - Merchant/Store name
  - Suggested category (one of: housing, transportation, groceries, utilities, entertainment, food, shopping,
   healthcare, education, personal, travel, insuarance, gifts, bills, other-expences)
  
  Only respond with valid JSON in this exact format:
  {
    "amount" : number,
    "date" : "ISO date string",
    "description" : "string",
    "merchantName" : "string",
    "category" : "string"
  }
    
  If its not a reciept,  return an empty object`;

  const result = await model.generateContent([
   {
    inlineData: {
     data: base64String,
     mimeType: file.type,
    },
   },
   prompt,
  ]);

  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, '').trim();
  try {
   const data = JSON.parse(cleanedText);
   return {
    amount: parseFloat(data.amount),
    date: new Date(data.date),
    description: data.description,
    category: data.category,
    merchantName: data.merchantName,
   };
  } catch (parseError) {
   console.error('Error parsing JSON response:', parseError);
   throw new Error('Invalid response format from GEMINI !');
  }
 } catch (error) {
  console.error('Error scanning reciept:', error.message);
  throw new Error('Failed to scan the reciept !');
 }
}
