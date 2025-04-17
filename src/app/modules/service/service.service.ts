import { prisma } from "../../utils/prisma";
import { Bike, Prisma, ServiceRecord } from "../../../../generated/prisma";
import { IPagination } from "../../types";
import { paginationHelper } from "../../utils/paginationHelper";
import { serviceSearchableFields } from "./service.constant";
import AppError from "../../middlewares/errorHandler/appError";

import httpStatus, { status } from "http-status";
import { IAllService, IServiceFilteredQuery } from "./service.interface";

// Create service record
const createService = async (data: ServiceRecord) => {
  const serviceData = {
    serviceDate: data.serviceDate,
    description: data.description,
    status: data.status,
    bikeId: data.bikeId,
    ...(data.completionDate && { completionDate: data.completionDate }),
  };

  const result = await prisma.serviceRecord.create({ data: serviceData });

  return result;
};

//Get single service record data by id
const getSingleService = async (
  serviceId: string
): Promise<ServiceRecord | null> => {
  const foundBike = await prisma.serviceRecord.findUnique({
    where: {
      serviceId,
    },
  });

  if (!foundBike)
    throw new AppError(httpStatus.NOT_FOUND, "Service Record not found");

  const result = await prisma.serviceRecord.findUnique({
    where: {
      serviceId,
    },
  });
  return result;
};

//Get all service record data
const getAllService = async (
  query: IServiceFilteredQuery,
  pagination: IPagination
): Promise<IAllService> => {
  const { page, take, skip, orderBy } = paginationHelper(
    pagination,
    "serviceDate"
  );

  // console.log("Pagination data:", query);
  const { searchTerm, ...filterData } = query;
  const searchCondition: Prisma.ServiceRecordWhereInput[] = [];

  if (query.searchTerm) {
    searchCondition.push({
      OR: serviceSearchableFields.map((field) => ({
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

  const whereConditions: Prisma.ServiceRecordWhereInput = {
    AND: searchCondition,
  };

  const result = await prisma.serviceRecord.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy,
  });

  const total = await prisma.serviceRecord.count({
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

//Update single service record status data by id
const updateSingleService = async (
  serviceId: string,
  data: Partial<ServiceRecord>
): Promise<ServiceRecord> => {
  const foundService = await prisma.serviceRecord.findUnique({
    where: {
      serviceId,
    },
  });

  if (!foundService)
    throw new AppError(httpStatus.NOT_FOUND, "Service record not found");

  const dataToSave = {
    status: "done",
    completionDate: new Date(data?.completionDate || Date.now()).toISOString(),
  };

  const result = await prisma.serviceRecord.update({
    where: {
      serviceId,
    },
    data: dataToSave,
  });
  return result;
};

//Get all service record data
const getAllOverdueService = async (
  pagination: IPagination
): Promise<IAllService> => {
  const { page, take, skip, orderBy } = paginationHelper(
    pagination,
    "serviceDate"
  );

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const searchCondition: Prisma.ServiceRecordWhereInput[] = [];

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

  const whereConditions: Prisma.ServiceRecordWhereInput = {
    AND: searchCondition,
  };

  const result = await prisma.serviceRecord.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy,
  });

  const total = await prisma.serviceRecord.count({
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

export const serviceService = {
  createService,
  getAllService,
  getSingleService,
  updateSingleService,
  getAllOverdueService,
};
