import z from "zod";
export const userLoginValidator = z.object({
  email: z.string(),
});
export const userRegisterValidator = z.object({
  email: z.string().min(3),
});
