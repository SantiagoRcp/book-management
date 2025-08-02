import * as z from "zod";

const RegisterUserValid = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.email("Invalid email address").trim(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_?]).+$/,
      "Password must contain at least one uppercase letter, on number, and one special character !@#$%^&*()_?"
    )
    .min(8, "password must be at least 8 characters long")
    .trim(),
});

const LoginUserValid = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_?]).+$/,
      "Password must contain at least one uppercase letter, on number, and one special character !@#$%^&*()_?"
    )
    .min(8, "password must be at least 8 characters long")
    .trim(),
});

type RegisterUserValid = z.infer<typeof RegisterUserValid>;
type LoginUserValid = z.infer<typeof LoginUserValid>;

export { RegisterUserValid, LoginUserValid };
