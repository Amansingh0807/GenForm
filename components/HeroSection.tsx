import React from "react";
import GenerateFormInput from "./GenerateFormInput";
import { Button } from "./ui/button";

type suggentionBox = {
  label: string;
  text: string;
};

const SuggestionBtnText: suggentionBox[] = [
  {
    label: "Job Application",
    text: "Develop a basic job application form using GenForm AI and also write the prompt using that",
  },
  {
    label: "School Details",
    text: "Develop a basic job application form using GenForm AI and also write the prompt using that",
  },
  {
    label: "FeedBack",
    text: "Develop a basic job application form using GenForm AI and also write the prompt using that",
  },
  {
    label: "Nominations",
    text: "Develop a basic job application form using GenForm AI and also write the prompt using that",
  },
];

const HeroSection = () => {
  return (
    <section>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 -z-10"></div>
        <div className=" conatiner mx-auto text-center relative ">
          <h1 className="text-4xl font-bold">Efficient forms Via AI</h1>
          <p className="mt-4 text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
      </div>

      <GenerateFormInput />
      <div className="grid grid-cols-4 gap-3">
        {SuggestionBtnText.map((item: suggentionBox, index: number) => (
          <Button
            className="rounded-full h-10 "
            variant={"outline"}
            key={index}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </section>
  );
};
export default HeroSection;
