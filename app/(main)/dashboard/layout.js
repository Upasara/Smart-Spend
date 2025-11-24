import React, { Suspense } from 'react'
import DashboardPage from './page'
import { BarLoader } from 'react-spinners'

const DashboardLayout = () => {
  return (
    <div className='p-5'>
    <h1 className='text-3xl md:text-4xl font-semibold mb-5'>Dashboard</h1>
    <Suspense
     fallback={<BarLoader className='mt-4' width={'100%'} color='#16a34a' />}
    >
     <DashboardPage />
    </Suspense>
   </div>
  )
}

export default DashboardLayout