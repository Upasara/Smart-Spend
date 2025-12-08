import { Body, Button, Head, Html, Preview } from '@react-email/components';
import * as React from 'react';

export default function Email({
 userName = '',
 type = 'budget-alert',
 data = {},
}) {
 if (type === 'monthly-report') {
 }
 if (type === 'budget-alert') {
  return (
   <Html>
    <Head />
    <Preview>BUdget Alert</Preview>
    <Body style={style.body}></Body>
   </Html>
  );
 }
}
