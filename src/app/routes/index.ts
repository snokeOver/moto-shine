import express from "express";
import customerRotes from "../modules/customer/customer.route";

import bikeRoutes from "../modules/bike/bike.route";

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
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
