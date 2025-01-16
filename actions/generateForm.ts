"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini SDK

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Ensure the Gemini API key is set in your environment variables

export const generateForm = async (prevState: unknown, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Define schema for validation
    const schema = z.object({
      description: z.string().min(1, "Description is required"),
    });

    const validationResult = schema.safeParse({
      description: formData.get("description") as string,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: "Invalid form data",
        error: validationResult.error.errors,
      };
    }

    const description = validationResult.data.description;

    if (!GEMINI_API_KEY) {
      return { success: false, message: "Gemini API key not found" };
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp", // Use the correct Gemini model
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    // Start a chat session and send the prompt
    const chatSession = model.startChat({ generationConfig, history: [] });

    const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
{
  "formTitle": "string", // The title of the form
  "formFields": [        // An array of fields in the form
    {
      "label": "string", // The label to display for the field
      "name": "string",  // The unique identifier for the field (used for form submissions)
      "placeholder": "string" // The placeholder text for the field
    }
  ]
}
Requirements:
- Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
- Always include at least 3 fields in the "formFields" array.
- Keep the field names consistent across every generation for reliable rendering.
- Provide meaningful placeholder text for each field based on its label.`;

    const result = await chatSession.sendMessage(`${description} ${prompt}`);
    const formContent = result.response.text(); // Parse response content

    if (!formContent) {
      return { success: false, message: "No form content generated" };
    }

    console.log("Generated form ->", formContent);

    // Save the generated form to the database
    const form = await prisma.form.create({
      data: {
        ownerId: user.id,
        content: formContent,
      },
    });

    revalidatePath("/dashboard/forms"); // Optionally revalidate a path if necessary

    return {
      success: true,
      message: "Form generated successfully.",
      data: form,
    };
  } catch (error) {
    console.error("Error generating form:", error);
    return {
      success: false,
      message: "An error occurred while generating the form",
    };
  }
};
