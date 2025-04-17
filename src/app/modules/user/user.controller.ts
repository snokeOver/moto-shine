import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

import { Request, Response } from "express";
import { tryCatchAsync } from "../../utils/tryCatchAsync";

const createAdmin = tryCatchAsync(async (req: Request, res: Response) => {
  // const result = await userService.createAdmin(req.body);
  const result = null;

  sendResponse({
    res,
    sendData: {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: result,
    },
  });
});

export const userController = {
  createAdmin,
};
