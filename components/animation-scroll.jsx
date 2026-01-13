'use client';

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function AOSProvider() {
 useEffect(() => {
  Aos.init({ duration: 1000 });
 }, []);

 return null;
}
