import express from "express";
import { serviceController } from "./service.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { validateService } from "./service.validate";

const serviceRoutes = express.Router();

serviceRoutes.post(
  "/",
  validateRequest(validateService.create),
  serviceController.createService
);

serviceRoutes.get("/", serviceController.getAllServices);
serviceRoutes.get("/status", serviceController.getAllOverdueServices);
serviceRoutes.get("/:id", serviceController.getSingleService);

serviceRoutes.put(
  "/:id/complete",
  validateRequest(validateService.update),
  serviceController.updateSingleService
);

export default serviceRoutes;
