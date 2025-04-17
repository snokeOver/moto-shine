import express from "express";
import { customerController } from "./bike.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { validateCustomer } from "./bike.validate";

const bikeRoutes = express.Router();

bikeRoutes.post(
  "/",
  validateRequest(validateCustomer.create),
  customerController.createBike
);

bikeRoutes.get("/", customerController.getAllBikes);
bikeRoutes.get("/:id", customerController.getSingleBike);

export default bikeRoutes;
