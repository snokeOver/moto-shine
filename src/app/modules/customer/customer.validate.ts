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

const update = z.object({
  body: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
    })
    .strict(),
});

export const validateCustomer = {
  create,
  update,
};
