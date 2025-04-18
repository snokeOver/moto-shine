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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceService = void 0;
const prisma_1 = require("../../utils/prisma");
const paginationHelper_1 = require("../../utils/paginationHelper");
const service_constant_1 = require("./service.constant");
const appError_1 = __importDefault(require("../../middlewares/errorHandler/appError"));
const http_status_1 = __importDefault(require("http-status"));
// Create service record
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = Object.assign({ serviceDate: data.serviceDate, description: data.description, status: data.status, bikeId: data.bikeId }, (data.completionDate && { completionDate: data.completionDate }));
    const result = yield prisma_1.prisma.serviceRecord.create({ data: serviceData });
    return result;
});
//Get single service record data by id
const getSingleService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBike = yield prisma_1.prisma.serviceRecord.findUnique({
        where: {
            serviceId,
        },
    });
    if (!foundBike)
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Service Record not found");
    const result = yield prisma_1.prisma.serviceRecord.findUnique({
        where: {
            serviceId,
        },
    });
    return result;
});
//Get all service record data
const getAllService = (query, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, take, skip, orderBy } = (0, paginationHelper_1.paginationHelper)(pagination, "serviceDate");
    // console.log("Pagination data:", query);
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const searchCondition = [];
    if (query.searchTerm) {
        searchCondition.push({
            OR: service_constant_1.serviceSearchableFields.map((field) => ({
                [field]: { contains: query.searchTerm, mode: "insensitive" },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        searchCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = {
        AND: searchCondition,
    };
    const result = yield prisma_1.prisma.serviceRecord.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy,
    });
    const total = yield prisma_1.prisma.serviceRecord.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit: take,
            total,
        },
        data: result,
    };
});
//Update single service record status data by id
const updateSingleService = (serviceId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const foundService = yield prisma_1.prisma.serviceRecord.findUnique({
        where: {
            serviceId,
        },
    });
    if (!foundService)
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Service record not found");
    const dataToSave = {
        status: "done",
        completionDate: new Date((data === null || data === void 0 ? void 0 : data.completionDate) || Date.now()).toISOString(),
    };
    const result = yield prisma_1.prisma.serviceRecord.update({
        where: {
            serviceId,
        },
        data: dataToSave,
    });
    return result;
});
//Get all service record data
const getAllOverdueService = (pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, take, skip, orderBy } = (0, paginationHelper_1.paginationHelper)(pagination, "serviceDate");
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const searchCondition = [];
    const serchableFields = ["pending", "in-progress"];
    searchCondition.push({
        OR: serchableFields.map((field) => ({
            status: field,
        })),
    });
    searchCondition.push({
        serviceDate: {
            lt: sevenDaysAgo,
        },
    });
    const whereConditions = {
        AND: searchCondition,
    };
    const result = yield prisma_1.prisma.serviceRecord.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy,
    });
    const total = yield prisma_1.prisma.serviceRecord.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit: take,
            total,
        },
        data: result,
    };
});
exports.serviceService = {
    createService,
    getAllService,
    getSingleService,
    updateSingleService,
    getAllOverdueService,
};
