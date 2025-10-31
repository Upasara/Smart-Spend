import { Checkbox } from '@/components/ui/checkbox';
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table';
import React from 'react';

const TransactionTable = ({ transactions }) => {
 const handleSort = () => {};

 return (
  <div className='space-y-4'>
   <div className='rounded-md border'>
    <Table>
     <TableHeader>
      <TableRow>
       <TableHead>
        <Checkbox />
       </TableHead>
       <TableHead className='cursor-pointer' onClick={() => handleSort('date')}>
        DATE
       </TableHead>
       <TableHead
        className='cursor-pointer'
        onClick={() => handleSort('categoryss')}
       >
        CATEGORY
       </TableHead>
       <TableHead
        className='cursor-pointer'
        onClick={() => handleSort('amount')}
       >
        AMOUNT
       </TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      <TableRow>
       <TableCell>INV001</TableCell>
       <TableCell>Paid</TableCell>
       <TableCell>Credit Card</TableCell>
       <TableCell>$250.00</TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </div>
  </div>
 );
};

export default TransactionTable;
