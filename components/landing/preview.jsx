import Image from 'next/image';
import React from 'react';

const Preview = () => {
 return (
  <div className='mt-10 p-5 bg-white pb-10'>
   <h1 className='text-2xl md:text-3xl text-center mb-10 mt-10  font-semibold text-green-600 text-shadow-2xs '>
    Everything You Need, In One Dashboard
   </h1>
   <div className='grid md:grid-cols-2 gap-6'>
    <div className='p-0 md:p-0 lg:p-10 flex items-center justify-center'>
     <Image
      src='/dashboard1.png'
      alt='dashboard image'
      layout='responsive'
      height={400}
      width={700}
      className='rounded-lg shadow-lg'
      data-aos='zoom-in-up'
     />
    </div>
    <div className='space-y-3 lg:space-y-4 text-sm md:text-base lg:text-lg flex flex-col justify-center ml-0  lg:ml-20 text-gray-800'>
     <p>📊 Real-time income and expense overview </p>
     <p>🧩 Account-wise financial tracking</p>
     <p> 📈 Interactive charts and breakdowns</p>
     <p>⏱️ Quick view of recent transactions</p>
     <p>🧠 Built-in AI spending insights </p>
     <p>🔔 Visual budget usage indicators </p>
     <p> 🔄 Clear view of recurring expenses</p>
     <p>✏️ Edit, delete, or bulk-manage transactions</p>
     <p> 📱 Fully responsive dashboard design</p>
     <p>🔐 Secure, user-only data access </p>
    </div>
   </div>
  </div>
 );
};

export default Preview;
