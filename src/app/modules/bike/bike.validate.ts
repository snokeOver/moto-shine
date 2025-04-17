import { z } from "zod";

const create = z.object({
  body: z
    .object({
      brand: z.string(),
      model: z.string(),
      customerId: z.string(),
      year: z.number(),
    })
    .strict(),
});

export const validateCustomer = {
  create,
};
