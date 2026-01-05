'use client';

import { scanReciept } from '@/actions/transaction';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { Camera, Loader2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const RecieptScanner = ({ onScanComplete }) => {
 const fileInputRef = useRef();

 const {
  loading: scanRecieptLoading,
  fn: scanRecieptFn,
  data: scannedData,
 } = useFetch(scanReciept);

 const handleRecieptScan = async (file) => {
  if (file.size > 5 * 1024 * 1024) {
   toast.error('File size should be below 5MB');
   return;
  }
  await scanRecieptFn(file);
 };

 useEffect(() => {
  if (scannedData && !scanRecieptLoading) {
   onScanComplete(scannedData);
   toast.success('Reciept scanned successfully');
   console.log(scannedData);
  }
 }, [scanRecieptLoading, scannedData]);

 return (
  <div>
   <input
    type='file'
    ref={fileInputRef}
    className='hidden'
    accept='image/*'
    capture='environment'
    onChange={(e) => {
     const file = e.target.files?.[0];
     if (file) handleRecieptScan(file);
    }}
   />
   <Button
    type='button'
    className='w-full h-10 mb-5'
    onClick={() => fileInputRef.current?.click()}
    disabled={scanRecieptLoading}
   >
    {scanRecieptLoading ? (
     <>
      <Loader2 className='mr-2 animate-spin' />
      <span>Scanning Reciept...</span>
     </>
    ) : (
     <>
      <Camera className='mr-2' />
      <span>Scan Reciept with AI</span>
     </>
    )}
   </Button>
  </div>
 );
};

export default RecieptScanner;
