import PricingPage from '@/components/PricingPage';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

// Use getServerSideProps for server-side data fetching
export const getServerSideProps = async () => {
  const user = await currentUser(); // Fetch the current user server-side

  // Pass the user ID to the page
  return {
    props: {
      userId: Number(user?.id) || 0,
    },
  };
};

interface PageProps {
  userId: number;
}

const Page: React.FC<PageProps> = ({ userId }) => {
  return (
    <div>
      <PricingPage userId={userId.toString()} />
    </div>
  );
};

export default Page;
