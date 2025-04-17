import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

import { Request, Response } from "express";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { customerService } from "./customer.service";

const createCustomer = tryCatchAsync(async (req: Request, res: Response) => {
  const result = await customerService.createCustomer(req.body);

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customer created successfully",
      data: result,
    },
  });
});

export const customerController = {
  createCustomer,
};
