"use client"
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
import {useRouter}  from "next/navigation";

interface YourComponentProps {
  userId: number;
}


const PricingPage: React.FC<YourComponentProps> = ({ userId }) => {
  return (
        <div>
           <div>
      User ID: {userId}
    </div>
        <div className="text-center mb-16">
          <h1 className="font-extrabold text-3xl">Plan and Pricing</h1>
          <p className="text-gray-500">
            Receive unlimited credits when you pay earl, and save your plan.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
{
    pricingPlan.map((plan:PricingPlan, index:number)=>(
        <Card
        className={`${
          plan.level === "Enterprise" && "bg-[#1c1c1c] text-white"
        } w-[350px] flex flex-col justify-between`}
        key={index}
      >
        <CardHeader className="flex flex-row items-center gap-2">
          <CardTitle>{plan.level}</CardTitle>
         {
            plan.level ==="Pro" && <Badge className='text text-center'>👑 Popular</Badge>
         }
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
          <Button variant="outline" className='w-full'>Get Started with {plan.level}</Button>
          
        </CardFooter>
      </Card>
    ))
}
</div>
        </div>
        
    )
}

export default PricingPage;