import z from "zod";

export const UserZodSchema = z.object({
  id: z.string({ required_error: "User Id doit être fournie" }).optional(),

  email: z
    .string({ required_error: "Vous devez entrer votre email" })
    .email(z.string({ required_error: "Votre email n'est pas valide" }))
    .min(3, { message: "Enter une adresse email valide" }),
});

export const PostZodSchema = z.object({
  title: z
    .string({ required_error: "Title cannot be empty" })
    .min(10, { message: "Title must be at least 10 characters" })
    .max(150, { message: "Title is too long, Max is 150 characters" }),

  description: z
    .string({ required_error: "Description cannot be empty" })
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description is too long, Max is 255 characters" }),

  content: z
    .string({ required_error: "Content cannot be empty" })
    .min(10, { message: "Content must be at least 10 characters" }),

  photo: z
    .string({ required_error: "Photo url cannot be empty" })
    .min(2, { message: "Photo url must be provided" }),
});
