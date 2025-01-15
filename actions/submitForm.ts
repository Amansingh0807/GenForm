"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const submitForm = async (formId: number, formData: any) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { success: false, message: "User not found" }
        }
        if (!formId) {
            return { success: false, message: "Form id not found" }
        }
        const form = await prisma.form.findUnique({
            where: {
                id: formId
            }
        });
        if (!form) {
            return { success: false, message: "form not found" }
        }
        await prisma.submissions.create({
            data: {
                formId,
                content: formData
            }
        });

        await prisma.form.update({
            where: {
                id: formId
            },
            data: {
                submissions: {
                    increment: 1
                }
            }

        });
        return { success: true, message: "Form submitted successsfully." }
    } catch (error) {
        console.log(error);
    }
}