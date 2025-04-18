"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateService = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        description: zod_1.z.string(),
        serviceDate: zod_1.z.string(),
        bikeId: zod_1.z.string(),
        status: zod_1.z.enum(["pending", "done", "in-progress"]),
        completionDate: zod_1.z.string().optional(),
    })
        .strict(),
});
const update = zod_1.z.object({
    body: zod_1.z
        .object({
        completionDate: zod_1.z.string().optional(), // Only `completionDate` is allowed
    })
        .strict()
        .optional()
        .refine((data) => {
        if (data && Object.keys(data).length > 1) {
            return false;
        }
        return true;
    }, {
        message: "Only completionDate is allowed in the body",
    }),
});
exports.validateService = {
    create,
    update,
};
