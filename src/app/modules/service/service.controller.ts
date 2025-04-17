import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

import { Request, Response } from "express";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { serviceService } from "./service.service";
import {
  paginationProperties,
  validSearchableFields,
} from "./service.constant";
import { pick } from "../../utils/pick";

//Create service record
const createService = tryCatchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.createService(req.body);

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Service record created successfully",
      data: result,
    },
  });
});

//Get single service record data by id
const getSingleService = tryCatchAsync(async (req, res) => {
  const result = await serviceService.getSingleService(req.params.id);
  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service record fetched successfully",
      data: result,
    },
  });
});

//Get all service records
const getAllServices = tryCatchAsync(async (req, res) => {
  const filteredQuery = pick(req.query, validSearchableFields);
  const pagination = pick(req.query, paginationProperties);

  const result = await serviceService.getAllService(filteredQuery, pagination);

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service records fetched successfully",
      data: result.data,
    },
  });
});

//Update single service record status by id
const updateSingleService = tryCatchAsync(async (req, res) => {
  const result = await serviceService.updateSingleService(
    req.params.id,
    req.body
  );

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service marked as completed",
      data: result,
    },
  });
});

//Get all overdue service records
const getAllOverdueServices = tryCatchAsync(async (req, res) => {
  const pagination = pick(req.query, paginationProperties);

  const result = await serviceService.getAllOverdueService(pagination);

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Overdue or pending services fetched successfully",
      data: result.data,
    },
  });
});

export const serviceController = {
  createService,
  getAllServices,
  getSingleService,
  updateSingleService,
  getAllOverdueServices,
};
