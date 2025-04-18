"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../../generated/prisma");
const http_status_1 = __importDefault(require("http-status"));
const handlePrismaError = (err) => {
    const statusCode = http_status_1.default.BAD_REQUEST;
    let errorSources = [];
    if (err instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma error codes (e.g., unique constraint, foreign key constraint)
        errorSources.push({
            path: "",
            message: err.message,
        });
    }
    if (err instanceof prisma_1.Prisma.PrismaClientValidationError) {
        // Handle validation errors from PrismaClient
        errorSources.push({
            path: "", // Prisma doesn't provide detailed path in validation errors
            message: err.message,
        });
    }
    return {
        statusCode,
        message: "Database Error",
        errorSources,
    };
};
exports.default = handlePrismaError;
