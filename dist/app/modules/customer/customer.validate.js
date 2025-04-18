"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomer = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        email: zod_1.z.string(),
    })
        .strict(),
});
const update = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.validateCustomer = {
    create,
    update,
};
