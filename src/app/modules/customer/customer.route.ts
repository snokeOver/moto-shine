import express from "express";
import { customerController } from "./customer.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { validateCustomer } from "./customer.validate";
const customerRotes = express.Router();

customerRotes.post(
  "/",
  validateRequest(validateCustomer.create),
  customerController.createCustomer
);

export default customerRotes;
