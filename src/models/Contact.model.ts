import {z} from "zod";

export type contactsTable = {
    data: {
        name: string,
        phoneNumber: string
    }
}

export const contactSchema = z.object({
    name: z.string({message: "Please enter name"}).min(1, {message: "Please enter name"}),
    phoneNumber: z.string({message: "Please enter valid phone number"}).min(9, {message: "Please enter valid phone number"}),
})

export type Contact = z.infer<typeof contactSchema>;

export const editContactFormSchema = z.object({
    name: z.string({message: "Please enter name"}).min(1, {message: "Please enter name"}),
})

export const searchContactFormSchema = z.object({
    phoneNumber: z.string({message: "Please enter valid phone number"}).min(9, {message: "Please enter valid phone number"}),
})