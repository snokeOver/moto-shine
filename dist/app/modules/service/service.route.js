"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const service_validate_1 = require("./service.validate");
const serviceRoutes = express_1.default.Router();
serviceRoutes.post("/", (0, validateRequest_1.validateRequest)(service_validate_1.validateService.create), service_controller_1.serviceController.createService);
serviceRoutes.get("/", service_controller_1.serviceController.getAllServices);
serviceRoutes.get("/status", service_controller_1.serviceController.getAllOverdueServices);
serviceRoutes.get("/:id", service_controller_1.serviceController.getSingleService);
serviceRoutes.put("/:id/complete", (0, validateRequest_1.validateRequest)(service_validate_1.validateService.update), service_controller_1.serviceController.updateSingleService);
exports.default = serviceRoutes;
