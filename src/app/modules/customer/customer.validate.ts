import { z } from "zod";

const create = z.object({
  body: z
    .object({
      name: z.string(),
      phone: z.string(),
      email: z.string(),
    })
    .strict(),
});

export const validateCustomer = {
  create,
};
