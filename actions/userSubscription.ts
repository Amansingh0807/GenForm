"use server";

import prisma from "@/lib/prisma";
import { string } from "zod";

export const createSubscription = async ({ userId }: { userId: string }) => {
  if (!userId) {
    throw new Error("Invalid or missing user ID");
  }

  const subscription = await prisma.subscription.create({
    data: {
      userId, // Use userId as a string
      plan: "basic", // Add a default plan
      subscribed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return subscription;
};

export const getUserSubscription = async (userId: string) => {
  // Validate the userId before proceeding
  if (!userId) {
    throw new Error("Invalid or missing user ID");
  }

  // Fetch the subscription for the given user ID
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId, // Use userId as a string
    },
  });

  // Check if the user is subscribed
  return subscription?.subscribed ? true : false;
};
