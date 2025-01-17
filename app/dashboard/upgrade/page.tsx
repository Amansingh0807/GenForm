import PricingPage from '@/components/PricingPage';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

// This is a server component
const Page = async () => {
  const user = await currentUser(); // Fetch the current user server-side

  return (
    <div>
      <PricingPage userId={(user?.id || '0').toString()} />
    </div>
  );
};

export default Page;
