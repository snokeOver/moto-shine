import { z } from "zod";

const create = z.object({
  body: z
    .object({
      description: z.string(),
      serviceDate: z.string(),
      bikeId: z.string(),
      status: z.enum(["pending", "done", "in-progress"]),
      completionDate: z.string().optional(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      completionDate: z.string().optional(), // Only `completionDate` is allowed
    })
    .strict()
    .optional()
    .refine(
      (data) => {
        if (data && Object.keys(data).length > 1) {
          return false;
        }
        return true;
      },
      {
        message: "Only completionDate is allowed in the body",
      }
    ),
});

export const validateService = {
  create,
  update,
};
