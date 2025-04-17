import express from "express";
import customerRotes from "../modules/customer/customer.route";

const router = express.Router();

const routes = [
  {
    path: "/customers",
    route: customerRotes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
