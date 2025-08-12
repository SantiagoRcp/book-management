import * as z from "zod";

const RegisterGenreValid = z.object({
  name: z.string().min(5).trim(),
  slug: z.string().min(5).trim(),
});

const UpdateGenreValid = z.object({
  name: z.string().min(5).trim().optional(),
  slug: z.string().min(5).trim().optional(),
});

type RegisterGenreValid = z.infer<typeof RegisterGenreValid>;
type UpdateGenreValid = z.infer<typeof UpdateGenreValid>;

export { RegisterGenreValid, UpdateGenreValid };
