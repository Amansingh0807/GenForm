"use server";

import { getForms } from "@/actions/getForms";
import { getUserSubscription } from "@/actions/userSubscription";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PricingPage from "@/components/PricingPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = async () => {
  try {
    // Fetch the current logged-in user
    const user = await currentUser();
    console.log("User data:", user);

    // If no user is found, redirect to sign-in page
    if (!user) {
      redirect("/sign-in");
    }

    // Fetch forms created by the user
    const forms = await getForms();
    const totalNumberOfFormCreated = forms?.data?.length || 0;

    // Check if the user has an active subscription
    const isSubscribed = await getUserSubscription(user.id);
    console.log("Is Subscribed:", isSubscribed);

    // Return the homepage with data
    return (
      <div className="grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20">
        <HeroSection
          totalForms={totalNumberOfFormCreated}
          isSubscribed={isSubscribed.isSubscribed}
        />
        <PricingPage userId={user.id} />
        <Footer />
      </div>
    );
  } catch (error: unknown) {
    // Handle error properly with type guard for the error object
    if (error instanceof Error) {
      console.error("Error in HomePage:", error.message);
    } else {
      console.error("An unknown error occurred");
    }

    // Show a fallback message when an error occurs
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          An error occurred. Please try again later.
        </p>
      </div>
    );
  }
};

export default HomePage;
