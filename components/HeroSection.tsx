"use client"
import React, { useState } from "react";
import GenerateFormInput from "./GenerateFormInput";
import { Button } from "./ui/button";

type SuggestionText = {
  label: string;
  text: string;
};

const suggestionBtnText: SuggestionText[] = [
  {
    label: "Job Application",
    text: "Develop a basic job application form that serves as a one-page solution form collecting essential information from applicants.",
  },
  {
    label: "Registration Form",
    text: "Create a course registration form suitable form any scheool or instituition.",
  },
  {
    label: "Feedback Form",
    text: "Create a client feedback form to gather valuable insights from any clients.",
  },
];

type Props = {
  totalForms:number;
  isSubscribed:boolean
}

type GenerateFormInput = {

  text: string;

  totalForms: number;

  isSubscribed: boolean;

};


const HeroSection :React.FC<Props> = ({totalForms, isSubscribed}) => {
  const [text, setText] = useState<string>("");

  return (
    <section>
      <div className="relative">
        {/* Glow effect  */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-600 blur-2xl opacity-50 -z-10"></div>

        <div className="container mx-auto text-center relative">
          <h1 className="text-4xl font-bold">
          Effortlessly Create AI-Powered Forms
          </h1>
          <p className="mt-4 text-lg ">
          Harness AI technology to build dynamic, responsive forms in just minutes.
          </p>
        </div>
      </div>
      {/* create input field  */}
      <GenerateFormInput text={text} totalForms={totalForms} isSubscribed={isSubscribed}/>
      <div className="grid grid-cols-4 gap-3">
        {suggestionBtnText.map((item: SuggestionText, index: number) => (
          <Button onClick={()=> setText(item.text)} key={index} className="rounded-full h-10" variant={"outline"}>
            {item.label}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;