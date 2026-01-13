'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

export default function SmoothScrollProvider({ children }) {
 useEffect(() => {
  const lenis = new Lenis({
   duration: 1.1,
   smoothWheel: true,
   easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  function raf(time) {
   lenis.raf(time);
   requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => lenis.destroy();
 }, []);
 return children;
}
