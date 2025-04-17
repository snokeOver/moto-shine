import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

import { Request, Response } from "express";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { customerService } from "./customer.service";
import {
  paginationProperties,
  validSearchableFields,
} from "./customer.constant";
import { pick } from "../../utils/pick";

//Create customer
const createCustomer = tryCatchAsync(async (req: Request, res: Response) => {
  const result = await customerService.createCustomer(req.body);

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Customer created successfully",
      data: result,
    },
  });
});

//Get single customer data by id
const getSingleCustomer = tryCatchAsync(async (req, res) => {
  const result = await customerService.getSingleCustomer(req.params.id);
  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customer fetched successfully",
      data: result,
    },
  });
});

const getAllCustomer = tryCatchAsync(async (req, res) => {
  const filteredQuery = pick(req.query, validSearchableFields);
  const pagination = pick(req.query, paginationProperties);

  const result = await customerService.getAllCustomer(
    filteredQuery,
    pagination
  );

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customers fetched successfully",
      data: result.data,
      meta: result.meta,
    },
  });
});

export const customerController = {
  createCustomer,
  getAllCustomer,
  getSingleCustomer,
};
