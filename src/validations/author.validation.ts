import * as z from "zod";

const RegisteAuthorValid = z.object({
  name: z.string().min(5).trim(),
  bio: z.string().trim(),
});

const UpdateAuthorValid = z.object({
  name: z.string().min(5).trim().optional,
  bio: z.string().trim().optional,
});

type RegisteAuthorValid = z.infer<typeof RegisteAuthorValid>;
type UpdateAuthorValid = z.infer<typeof UpdateAuthorValid>;

export { RegisteAuthorValid, UpdateAuthorValid };
