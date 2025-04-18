"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const tryCatchAsync_1 = require("../../utils/tryCatchAsync");
const customer_service_1 = require("./customer.service");
const customer_constant_1 = require("./customer.constant");
const pick_1 = require("../../utils/pick");
//Create customer
const createCustomer = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.createCustomer(req.body);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: "Customer created successfully",
            data: result,
        },
    });
}));
//Get single customer data by id
const getSingleCustomer = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.getSingleCustomer(req.params.id);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Customer fetched successfully",
            data: result,
        },
    });
}));
//Get all customer
const getAllCustomer = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredQuery = (0, pick_1.pick)(req.query, customer_constant_1.validSearchableFields);
    const pagination = (0, pick_1.pick)(req.query, customer_constant_1.paginationProperties);
    const result = yield customer_service_1.customerService.getAllCustomer(filteredQuery, pagination);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Customers fetched successfully",
            data: result.data,
        },
    });
}));
//Update single customer by id
const updateSingleCustomer = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.updateSingleCustomer(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Customer updated successfully",
            data: result,
        },
    });
}));
//delete single customer by id
const deleteSingleCustomer = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.deleteSingleCustomer(req.params.id);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Customer deleted successfully",
        },
    });
}));
exports.customerController = {
    createCustomer,
    getAllCustomer,
    getSingleCustomer,
    updateSingleCustomer,
    deleteSingleCustomer,
};
