"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { PricingPlan, pricingPlan } from "@/lib/pricingplan";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { getStripe } from "@/lib/stripe-client";

type Props = {
  userId: string | undefined;
};

const PricingPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();

  const checkoutHandler = async (price: number, plan: string) => {
    if (!userId) {
      router.push("/sign-in");
    }
    if (price === 0) {
      return;
    }
    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, userId, plan }),
      }).then((res) => res.json());

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="font-extrabold text-3xl">Pricing Options and Plans</h1>
        <p className="text-gray-500">
        Unlock unlimited credits with early payments and enjoy savings on your plan.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {pricingPlan.map((plan: PricingPlan, index: number) => (
          <div
            key={index}
            className="relative group transition-all duration-300"
          >
            {/* Card Shadow */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-600 blur-2xl opacity-50 -z-10 
              rounded-xl group-hover:opacity-70 transition-opacity duration-300"
            ></div>

            {/* Card */}
            <Card
              className={`${
                plan.level === "Enterprise" && "bg-[#1c1c1c] text-white"
              } w-[350px] flex flex-col justify-between transition-transform duration-300 
              group-hover:scale-95`}
            >
              <CardHeader className="flex flex-row items-center gap-2">
                <CardTitle>{plan.level}</CardTitle>
                {plan.level === "Pro" && (
                  <Badge className="text text-center">🚨 Popular</Badge>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-2xl font-bold">{plan.price}</p>
                <ul className="mt-4 space-y-2">
                  {plan.services.map((item: string, index: number) => (
                    <li className="flex items-center" key={index}>
                      <span className="text-green-500 mr-2">✔️</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={`${
                    plan.level === "Enterprise" ? "default" : "outline"
                  }`}
                  className={`${
                    plan.level === "Enterprise" &&
                    "text-black bg-white hover:bg-null"
                  } w-full`}
                  onClick={() =>
                    checkoutHandler(
                      plan.level === "Pro"
                        ? 29
                        : plan.level === "Enterprise"
                        ? 70
                        : 0,
                      plan.level
                    )
                  }
                >
                  Get started with {plan.level}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
