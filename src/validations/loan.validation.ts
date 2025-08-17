import * as z from "zod";

const CreateLoanValid = z.object({
  bookId: z.number(),
  userId: z.number(),
});

const ReturnLoanValid = z.object({
  loandId: z.number(),
});

type CreateLoanValid = z.infer<typeof CreateLoanValid>;
type ReturnLoanValid = z.infer<typeof ReturnLoanValid>;

export { CreateLoanValid, ReturnLoanValid };
