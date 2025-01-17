"use server";

import prisma from "@/lib/prisma";

export const createSubscription = async ({ userId }: { userId: string }) => {
  if (!userId) {
    throw new Error("Invalid or missing user ID");
  }

  try {
    // Create a new subscription for the user
    const subscription = await prisma.subscription.create({
      data: {
        userId, // Use userId as a string
        plan: "basic", // Default plan
        subscribed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return subscription;
  } catch (error) {
    // Log the error and throw it
    console.error("Error creating subscription:", error);
    throw new Error("Failed to create subscription");
  }
};

export const getUserSubscription = async (userId: string) => {
  if (!userId) {
    throw new Error("Invalid or missing user ID");
  }

  try {
    // Fetch the user's subscription details
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId, // Use userId as a string
      },
    });

    // If no subscription is found or the user is not subscribed, return false
    if (!subscription || !subscription.subscribed) {
      return { isSubscribed: false, subscription };
    }

    // Return subscription details if the user is subscribed
    return { isSubscribed: true, subscription };
  } catch (error) {
    // Log the error and throw it
    console.error("Error fetching user subscription:", error);
    throw new Error("Failed to fetch user subscription");
  }
};
