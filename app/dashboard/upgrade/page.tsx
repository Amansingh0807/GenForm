import PricingPage from '@/components/PricingPage'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
  const user = await currentUser();
  return (
    <div>
        <PricingPage userId = {user?.id}/>
        
    </div>
  )
}

export default page