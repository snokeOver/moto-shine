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
exports.customerService = void 0;
const prisma_1 = require("../../utils/prisma");
const paginationHelper_1 = require("../../utils/paginationHelper");
const customer_constant_1 = require("./customer.constant");
const appError_1 = __importDefault(require("../../middlewares/errorHandler/appError"));
const http_status_1 = __importDefault(require("http-status"));
// Create customer
const createCustomer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const customerData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
    };
    const result = yield prisma_1.prisma.customer.create({ data: customerData });
    return result;
});
//Get single Customer data by id
const getSingleCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCustomer = yield prisma_1.prisma.customer.findUnique({
        where: {
            customerId,
        },
    });
    if (!foundCustomer)
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    const result = yield prisma_1.prisma.customer.findUnique({
        where: {
            customerId,
        },
    });
    return result;
});
//Get all Customer data
const getAllCustomer = (query, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, take, skip, orderBy } = (0, paginationHelper_1.paginationHelper)(pagination);
    // console.log("Pagination data:", query);
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const searchCondition = [];
    if (query.searchTerm) {
        searchCondition.push({
            OR: customer_constant_1.customerSearchableFields.map((field) => ({
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
    const whereConditions = { AND: searchCondition };
    const result = yield prisma_1.prisma.customer.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy,
    });
    const total = yield prisma_1.prisma.customer.count({
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
//Update single customer data by id
const updateSingleCustomer = (customerId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCustomer = yield prisma_1.prisma.customer.findUnique({
        where: {
            customerId,
        },
    });
    if (!foundCustomer)
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    const result = yield prisma_1.prisma.customer.update({
        where: {
            customerId,
        },
        data,
    });
    return result;
});
//Delete single admin data by id
const deleteSingleCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCustomer = yield prisma_1.prisma.customer.findUnique({
        where: {
            customerId,
        },
    });
    if (!foundCustomer)
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    const result = yield prisma_1.prisma.customer.delete({
        where: {
            customerId,
        },
    });
    return result;
});
exports.customerService = {
    createCustomer,
    getAllCustomer,
    getSingleCustomer,
    updateSingleCustomer,
    deleteSingleCustomer,
};
