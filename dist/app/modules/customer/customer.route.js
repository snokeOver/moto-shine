"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("./customer.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const customer_validate_1 = require("./customer.validate");
const customerRotes = express_1.default.Router();
customerRotes.post("/", (0, validateRequest_1.validateRequest)(customer_validate_1.validateCustomer.create), customer_controller_1.customerController.createCustomer);
customerRotes.get("/", customer_controller_1.customerController.getAllCustomer);
customerRotes.get("/:id", customer_controller_1.customerController.getSingleCustomer);
customerRotes.delete("/:id", customer_controller_1.customerController.deleteSingleCustomer);
customerRotes.put("/:id", (0, validateRequest_1.validateRequest)(customer_validate_1.validateCustomer.update), customer_controller_1.customerController.updateSingleCustomer);
exports.default = customerRotes;
