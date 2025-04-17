import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

import { Request, Response } from "express";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { customerService } from "./bike.service";
import { paginationProperties, validSearchableFields } from "./bike.constant";
import { pick } from "../../utils/pick";

//Create bike
const createBike = tryCatchAsync(async (req: Request, res: Response) => {
  const result = await customerService.createBike(req.body);

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Bike added successfully",
      data: result,
    },
  });
});

//Get single bike data by id
const getSingleBike = tryCatchAsync(async (req, res) => {
  const result = await customerService.getSingleBike(req.params.id);
  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bike fetched successfully",
      data: result,
    },
  });
});

//Get all bikes
const getAllBikes = tryCatchAsync(async (req, res) => {
  const filteredQuery = pick(req.query, validSearchableFields);
  const pagination = pick(req.query, paginationProperties);

  const result = await customerService.getAllBike(filteredQuery, pagination);

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bikes fetched successfully",
      data: result.data,
    },
  });
});

export const customerController = {
  createBike,
  getAllBikes,
  getSingleBike,
};
