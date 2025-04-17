import { prisma } from "../../utils/prisma";
import config from "../../config";
import { Customer, Prisma } from "../../../../generated/prisma";
import { IAllCustomer, ICustomerFilteredQuery } from "./customer.interface";
import { IPagination } from "../../types";
import { paginationHelper } from "../../utils/paginationHelper";
import { customerSearchableFields } from "./customer.constant";
import AppError from "../../middlewares/errorHandler/appError";

import httpStatus from "http-status";

// Create customer
const createCustomer = async (data: Customer) => {
  const customerData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
  };

  const result = await prisma.customer.create({ data: customerData });

  return result;
};

//Get single Customer data by id
const getSingleCustomer = async (
  customerId: string
): Promise<Customer | null> => {
  const foundCustomer = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });

  if (!foundCustomer)
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");

  const result = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });
  return result;
};

//Get all Customer data
const getAllCustomer = async (
  query: ICustomerFilteredQuery,
  pagination: IPagination
): Promise<IAllCustomer> => {
  const { page, take, skip, orderBy } = paginationHelper(pagination);

  // console.log("Pagination data:", query);
  const { searchTerm, ...filterData } = query;
  const searchCondition: Prisma.CustomerWhereInput[] = [];

  if (query.searchTerm) {
    searchCondition.push({
      OR: customerSearchableFields.map((field) => ({
        [field]: { contains: query.searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    searchCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.CustomerWhereInput = { AND: searchCondition };

  const result = await prisma.customer.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy,
  });

  const total = await prisma.customer.count({
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
};

//Update single customer data by id
const updateSingleCustomer = async (
  customerId: string,
  data: Partial<Customer>
): Promise<Customer> => {
  const foundCustomer = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });

  if (!foundCustomer)
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");

  const result = await prisma.customer.update({
    where: {
      customerId,
    },
    data,
  });
  return result;
};

//Delete single admin data by id
const deleteSingleCustomer = async (customerId: string): Promise<Customer> => {
  const foundCustomer = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });

  if (!foundCustomer)
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");

  const result = await prisma.customer.delete({
    where: {
      customerId,
    },
  });

  return result;
};

export const customerService = {
  createCustomer,
  getAllCustomer,
  getSingleCustomer,
  updateSingleCustomer,
  deleteSingleCustomer,
};
