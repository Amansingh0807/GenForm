"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Ensure the Gemini API key is set in your environment variables
const GEMINI_API_URL = "https://api.gemini.ai/v1/endpoint"; // Replace with the correct Gemini API endpoint

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

    const result = schema.safeParse({
      description: formData.get("description") as string,
    });

    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data",
        error: result.error.errors,
      };
    }

    const description = result.data.description;

    if (!GEMINI_API_KEY) {
      return { success: false, message: "Gemini API key not found" };
    }

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
- Provide meaningful placeholder text for each field based on its label.
`;

    // Make a request to the Gemini API
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `${description} ${prompt}`,
        model: "gemini-latest", // Use the appropriate Gemini model
      }),
    });

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return { success: false, message: "Failed to generate form content" };
    }

    const responseData = await response.json();
    const formContent = responseData?.data?.content; // Adjust based on Gemini API's response structure

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
