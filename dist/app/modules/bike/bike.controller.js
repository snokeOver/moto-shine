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
const bike_service_1 = require("./bike.service");
const bike_constant_1 = require("./bike.constant");
const pick_1 = require("../../utils/pick");
//Create bike
const createBike = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.customerService.createBike(req.body);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: "Bike added successfully",
            data: result,
        },
    });
}));
//Get single bike data by id
const getSingleBike = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.customerService.getSingleBike(req.params.id);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Bike fetched successfully",
            data: result,
        },
    });
}));
//Get all bikes
const getAllBikes = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredQuery = (0, pick_1.pick)(req.query, bike_constant_1.validSearchableFields);
    const pagination = (0, pick_1.pick)(req.query, bike_constant_1.paginationProperties);
    const result = yield bike_service_1.customerService.getAllBike(filteredQuery, pagination);
    (0, sendResponse_1.sendResponse)({
        res,
        sendData: {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Bikes fetched successfully",
            data: result.data,
        },
    });
}));
exports.customerController = {
    createBike,
    getAllBikes,
    getSingleBike,
};
