import * as z from "zod";

const CreateBookValid = z.object({
  title: z.string().trim(),
  publishedDate: z.string(),
  isbn: z.string().trim(),
  summary: z.string().trim().optional(),
  genreIds: z.array(z.number()),
  authorId: z.number(),
  stock: z.number(),
});

const UpdateBookValid = z.object({
  title: z.string().trim().optional(),
  publishedDate: z.string().optional(),
  isbn: z.string().trim().optional(),
  summary: z.string().trim().optional(),
  genreIds: z.array(z.number()).optional(),
  authorId: z.number().optional(),
  stock: z.number().optional(),
});

type CreateBookValid = z.infer<typeof CreateBookValid>;
type UpdateBookValid = z.infer<typeof UpdateBookValid>;

export { CreateBookValid, UpdateBookValid };
