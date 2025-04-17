import express from "express";
import { customerController } from "./customer.controller";
const customerRotes = express.Router();

customerRotes.post("/", customerController.createCustomer);

export default customerRotes;
