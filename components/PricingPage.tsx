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
import { useRouter } from "next/navigation";
import { getStripe } from "@/lib/stripe-client";
import { Check } from "lucide-react";

type Props = {
  userId: string | undefined;
};

const PricingPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();

  const checkoutHandler = async (price: number, plan: string) => {
    if (!userId) {
      router.push("/sign-in");
      return;
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      {/* Header telemetry and title */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-syne text-gray-900 dark:text-white tracking-tight leading-tight">
          Pricing Options and Plans
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Unlock unlimited credits with early payments and enjoy savings on your plan.
        </p>
      </div>
      
      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center items-stretch max-w-6xl mx-auto">
        {pricingPlan.map((plan: PricingPlan, index: number) => {
          const isPro = plan.level === "Pro";
          const [amount, interval] = plan.price.split("/");

          return (
            <div
              key={index}
              className="relative flex justify-center h-full"
            >
              {/* Backglow for Pro plan */}
              {isPro && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-2xl opacity-80 -z-10 rounded-3xl select-none pointer-events-none" />
              )}

              {/* Console Card */}
              <Card
                className={`relative w-full flex flex-col justify-between overflow-hidden rounded-3xl transition-all duration-300 backdrop-blur-md select-text ${
                  isPro 
                    ? "border-t-4 border-t-emerald-500 border border-emerald-200 dark:border-emerald-500/30 bg-white dark:bg-[#090f19]/80 shadow-xl dark:shadow-2xl hover:scale-[1.02]" 
                    : "border border-gray-200 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/60 shadow-md hover:shadow-lg dark:shadow-none hover:scale-[1.01]"
                }`}
              >
                {/* Micro-grid background inside cards */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 select-none" 
                  style={{ 
                    backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.15) 1px, transparent 1px)", 
                    backgroundSize: "20px 20px" 
                  }} 
                />

                <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-extrabold font-syne text-gray-900 dark:text-white">
                    {plan.level}
                  </CardTitle>
                  {isPro && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-800/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold transition-colors">
                      Popular
                    </span>
                  )}
                </CardHeader>

                <CardContent className="relative z-10 flex-1 flex flex-col justify-between pb-6">
                  <div>
                    {/* Large amount and smaller interval */}
                    <div className="mt-2 mb-4 flex items-baseline">
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white font-syne tracking-tight">
                        {amount}
                      </span>
                      {interval && (
                        <span className="text-xs font-mono text-gray-400 dark:text-gray-500 ml-1">
                          /{interval}
                        </span>
                      )}
                    </div>

                    {/* Features list */}
                    <ul className="mt-6 space-y-3 font-mono text-xs text-gray-600 dark:text-gray-400 text-left">
                      {plan.services.map((item: string, idx: number) => (
                        <li className="flex items-start gap-2.5" key={idx}>
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="relative z-10 pt-2">
                  <Button
                    size="lg"
                    className={`w-full font-syne font-bold py-5 text-sm transition-all duration-300 rounded-xl cursor-pointer ${
                      isPro 
                        ? "text-white bg-emerald-600 hover:bg-emerald-500 border-none shadow-lg shadow-emerald-500/10 hover:scale-[1.01]" 
                        : "bg-white border border-gray-200 hover:bg-slate-50 text-gray-800 dark:bg-gray-900/40 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                    }`}
                    onClick={() =>
                      checkoutHandler(
                        plan.level === "Pro"
                          ? 15
                          : plan.level === "Enterprise"
                          ? 50
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
          );
        })}
      </div>
    </div>
  );
};

export default PricingPage;