"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomer = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        brand: zod_1.z.string(),
        model: zod_1.z.string(),
        customerId: zod_1.z.string(),
        year: zod_1.z.number(),
    })
        .strict(),
});
exports.validateCustomer = {
    create,
};
