"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteForm = async (formId:number) => {
    const form = await prisma.form.delete({
        where:{
            id:formId
        }
    });

    if(!form){
        return {success:false, message:"Form not found"}
    }

    // make sure update the form list
    revalidatePath("/dashboard/forms");

    return {
        success:true,
        message:"Form deleted successfully."
    }
}