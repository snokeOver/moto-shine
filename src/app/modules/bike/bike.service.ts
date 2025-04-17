import { prisma } from "../../utils/prisma";
import { Bike, Prisma } from "../../../../generated/prisma";
import { IPagination } from "../../types";
import { paginationHelper } from "../../utils/paginationHelper";
import { bikeSearchableFields } from "./bike.constant";
import AppError from "../../middlewares/errorHandler/appError";

import httpStatus from "http-status";
import { IAllBike, IBikeFilteredQuery } from "./bike.interface";

// Create customer
const createBike = async (data: Bike) => {
  const bikeData = {
    brand: data.brand,
    model: data.model,
    year: data.year,
    customerId: data.customerId,
  };

  const result = await prisma.bike.create({ data: bikeData });

  return result;
};

//Get single bike data by id
const getSingleBike = async (bikeId: string): Promise<Bike | null> => {
  const foundBike = await prisma.bike.findUnique({
    where: {
      bikeId,
    },
  });

  if (!foundBike) throw new AppError(httpStatus.NOT_FOUND, "Bike not found");

  const result = await prisma.bike.findUnique({
    where: {
      bikeId,
    },
  });
  return result;
};

//Get all Bike data
const getAllBike = async (
  query: IBikeFilteredQuery,
  pagination: IPagination
): Promise<IAllBike> => {
  const { page, take, skip, orderBy } = paginationHelper(pagination, "year");

  // console.log("Pagination data:", query);
  const { searchTerm, ...filterData } = query;
  const searchCondition: Prisma.BikeWhereInput[] = [];

  if (query.searchTerm) {
    searchCondition.push({
      OR: bikeSearchableFields.map((field) => ({
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

  const whereConditions: Prisma.BikeWhereInput = { AND: searchCondition };

  const result = await prisma.bike.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy,
  });

  const total = await prisma.bike.count({
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

export const customerService = {
  createBike,
  getAllBike,
  getSingleBike,
};
