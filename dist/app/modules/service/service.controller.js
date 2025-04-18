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
exports.serviceController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const tryCatchAsync_1 = require("../../utils/tryCatchAsync");
const service_service_1 = require("./service.service");
const service_constant_1 = require("./service.constant");
const pick_1 = require("../../utils/pick");
//Create service record
const createService = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.createService(req.body);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: "Service record created successfully",
            data: result,
        },
    });
}));
//Get single service record data by id
const getSingleService = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.getSingleService(req.params.id);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Service record fetched successfully",
            data: result,
        },
    });
}));
//Get all service records
const getAllServices = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredQuery = (0, pick_1.pick)(req.query, service_constant_1.validSearchableFields);
    const pagination = (0, pick_1.pick)(req.query, service_constant_1.paginationProperties);
    const result = yield service_service_1.serviceService.getAllService(filteredQuery, pagination);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Service records fetched successfully",
            data: result.data,
        },
    });
}));
//Update single service record status by id
const updateSingleService = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.updateSingleService(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Service marked as completed",
            data: result,
        },
    });
}));
//Get all overdue service records
const getAllOverdueServices = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagination = (0, pick_1.pick)(req.query, service_constant_1.paginationProperties);
    const result = yield service_service_1.serviceService.getAllOverdueService(pagination);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Overdue or pending services fetched successfully",
            data: result.data,
        },
    });
}));
exports.serviceController = {
    createService,
    getAllServices,
    getSingleService,
    updateSingleService,
    getAllOverdueServices,
};
