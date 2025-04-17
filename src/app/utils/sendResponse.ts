import { ISendResponse } from "../types";

export const sendResponse = <T>({ res, sendData }: ISendResponse<T>): void => {
  const { statusCode, success, message, data, meta } = sendData;

  const responsePayload: Record<string, unknown> = {
    success,
    message,
    ...(data !== undefined && { data: data || null }),
    ...(meta !== undefined && { meta: meta || null }),
  };

  res.status(statusCode).json(responsePayload);
};
