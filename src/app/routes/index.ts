import express from "express";
import customerRotes from "../modules/customer/customer.route";

import bikeRoutes from "../modules/bike/bike.route";
import serviceRoutes from "../modules/service/service.route";

const router = express.Router();

const routes = [
  {
    path: "/customers",
    route: customerRotes,
  },
  {
    path: "/bikes",
    route: bikeRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
