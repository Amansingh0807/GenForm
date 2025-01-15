import { getForms } from '@/actions/getForms';
import { getUserSubscription } from '@/actions/userSubscription';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PricingPage from '@/components/PricingPage';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const HomePage = async () => {
  try {
    const user = await currentUser();
    console.log("User data:", user); // Debug user data

    if (!user) {
      redirect("/sign-in");
    }

    const forms = await getForms();
    const totalNumberOfFormCreated = forms?.data?.length || 0;

    const isSubscribed = await getUserSubscription(user.id);
    console.log("Is Subscribed:", isSubscribed); // Debug subscription status

    return (
      <div className='grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20'>
        <HeroSection
          totalForms={totalNumberOfFormCreated}
          isSubscribed={isSubscribed}
        />
        <PricingPage userId={Number(user.id)} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error in HomePage:", error);
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-500'>An error occurred. Please try again later.</p>
      </div>
    );
  }
};

export default HomePage;
