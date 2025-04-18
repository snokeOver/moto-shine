"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const bike_validate_1 = require("./bike.validate");
const bikeRoutes = express_1.default.Router();
bikeRoutes.post("/", (0, validateRequest_1.validateRequest)(bike_validate_1.validateCustomer.create), bike_controller_1.customerController.createBike);
bikeRoutes.get("/", bike_controller_1.customerController.getAllBikes);
bikeRoutes.get("/:id", bike_controller_1.customerController.getSingleBike);
exports.default = bikeRoutes;
