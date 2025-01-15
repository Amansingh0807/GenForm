"use server"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { z } from "zod"
import { revalidatePath } from "next/cache";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API!);

export const generateForm = async (prevState:unknown, formData:FormData)=>{
    try{
        const user =await currentUser();
        if(!user){
            return {success:false,message:"User not found"}
        }
        const schema = z.object({
            description:z.string().min(1, "Description is required")
        });
        const result = schema.safeParse({
            description:formData.get("description") as string    
          })
          if (!result.success){
           return {success:false, message:"Invalid from data", error:result.error.errors} 
          }
          
          const description = result.data.description;

          if (!process.env.OPENAI_API_KEY) {
            return { success: false, message: "OPENAI api key not found" }
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

        // Request openai to genrate the form content

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const aiResult = await model.generateContent(prompt);
        console.log(aiResult.response.text());

        const formContent = aiResult.choices[0]?.message.content;
        if (!formContent) {
            return { success: false, message: "Failed to generate form content" }
        }

        console.log("generated form -> ",formContent);
        

        // let formJsonData;
        // // try {
        // //     formJsonData = JSON.parse(formContent);
        // // } catch (error) {
        // //     console.log("Error parsing JSON", error);
        // //     return { success: false, message: "Generated form content is not valid JSON" };
        // // }

        // console.log(formJsonData);
        
        // save the generated form to the databse
        const form = await prisma.form.create({
            data: {
                ownerId: user.id,
                content: formContent
            }
        });

        revalidatePath("/dashboard/forms"); // Optionally revalidate a path if necessary
        
        return {
            success: true,
            message: "Form generated successfully.",
            data: form
        }

    }catch(cerror){
        console.log("Error generated form", cerror);
        return { success: false, message: "An error occurred while generateing the form" }


    }    
}