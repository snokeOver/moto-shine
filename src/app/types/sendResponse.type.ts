import { Response } from "express";
import { IMeta } from "./pagination.type";

export interface ISendResponse<T> {
  res: Response;
  sendData: {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T | undefined | null;
    meta?: IMeta;
  };
}
