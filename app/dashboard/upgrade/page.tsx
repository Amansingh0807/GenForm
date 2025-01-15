import PricingPage from '@/components/PricingPage'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
  const user = await currentUser();
  return (
    <div>
        <PricingPage userId = {Number(user?.id) || 0}/>
        
    </div>
  )
}

export default page