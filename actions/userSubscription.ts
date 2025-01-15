"use server";

import prisma from "@/lib/prisma";

export const createSubscription = async ({ userId }: { userId: string }) => {
  if (!userId || isNaN(parseInt(userId, 10))) {
    throw new Error("Invalid or missing user ID");
  }

  const subscription = await prisma.subscription.create({
    data: {
      userId: parseInt(userId, 10), // Convert string to integer
      subscribed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return subscription;
};

export const getUserSubscription = async (userId: string) => {
  // Validate the userId before proceeding
  if (!userId || isNaN(parseInt(userId, 10))) {
    throw new Error("Invalid or missing user ID");
  }

  // Fetch the subscription for the given user ID
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: parseInt(userId, 10), // Convert string to integer
    },
  });

  // Check if the user is subscribed
  return subscription?.subscribed ? true : false;
};
