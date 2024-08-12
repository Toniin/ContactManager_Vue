import {z} from "zod";

export const userSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter username"
    }),
    isSignIn: z.boolean(),
})

export type User = z.infer<typeof userSchema>;

export const signInFormSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter username"
    }),
    password: z.string().min(1, {
        message: "Please enter password"
    }),
})

export type UserSignIn = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter username"
    }),
    password: z.string().min(1, {
        message: "Please enter password"
    }),
    role: z.enum(["USER", "ADMIN"], {
        required_error: "You need to select a role.",
    }),
})

export type UserSignUp = z.infer<typeof signUpFormSchema>;