"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (options, sort) => {
    const page = Number(options.page) || 1;
    const take = Number(options.limit) || 1000;
    const skip = (page - 1) * take;
    const sortBy = options.sortBy || sort || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    const orderBy = {
        [sortBy]: sortOrder,
    };
    return {
        page,
        take,
        skip,
        orderBy,
    };
};
exports.paginationHelper = paginationHelper;
