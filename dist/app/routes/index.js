"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_route_1 = __importDefault(require("../modules/customer/customer.route"));
const bike_route_1 = __importDefault(require("../modules/bike/bike.route"));
const service_route_1 = __importDefault(require("../modules/service/service.route"));
const router = express_1.default.Router();
const routes = [
    {
        path: "/customers",
        route: customer_route_1.default,
    },
    {
        path: "/bikes",
        route: bike_route_1.default,
    },
    {
        path: "/services",
        route: service_route_1.default,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
