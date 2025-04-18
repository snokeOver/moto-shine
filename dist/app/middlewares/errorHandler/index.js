"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const zod_1 = require("zod");
const handlePrismaError_1 = __importDefault(require("./handlePrismaError"));
const handleZodError_1 = __importDefault(require("./handleZodError"));
const appError_1 = __importDefault(require("./appError"));
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = Number(http_status_1.default.INTERNAL_SERVER_ERROR);
    let message = "Something went wrong!";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "PrismaClientKnownRequestError") {
        const simplifiedError = (0, handlePrismaError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err instanceof appError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    // Handle the error response
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        // errorSources,
        // error: err,
        stack: config_1.default.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
    // Do not return anything (ensure this handler does not return a value)
    return;
};
exports.globalErrorHandler = globalErrorHandler;
