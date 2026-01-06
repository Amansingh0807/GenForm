import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <SignUp
      signInUrl="/sign-in"
      appearance={{
        elements: {
          // make it to the center
          rootBox: "w-full flex justify-center items-center min-h-screen",
          card: "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 w-full",
          headerTitle: "text-2xl font-bold text-gray-900 dark:text-white",
          headerSubtitle: "text-gray-600 dark:text-gray-400",
          socialButtonsBlockButton:
            "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200",
          socialButtonsBlockButtonText: "font-semibold",
          formButtonPrimary:
            "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-0",
          formFieldInput:
            "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 dark:placeholder:text-gray-400",
          formFieldLabel: "text-gray-700 dark:text-gray-300 font-semibold",
          footerActionLink:
            "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-semibold underline-offset-4 hover:underline",
          identityPreviewText: "text-gray-900 dark:text-white",
          identityPreviewEditButton:
            "text-green-600 hover:text-green-700 dark:text-green-400",
          dividerLine: "bg-gray-300 dark:bg-gray-600",
          dividerText: "text-gray-500 dark:text-gray-400 font-medium",
          formFieldInputShowPasswordButton:
            "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
          footerActionText: "text-gray-600 dark:text-gray-400",
          formFieldInfoText__password: "text-gray-600 dark:text-white",
          formFieldSuccessText: "text-gray-600 dark:text-white",
          formFieldErrorText: "text-red-400 dark:text-red-300",
          footer: "bg-transparent",
          logoBox: "hidden",
        },
      }}
    />
  );
};

export default SignUpPage;
