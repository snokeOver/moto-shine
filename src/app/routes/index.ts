import express from "express";
import userRotes from "../modules/user/user.route";

const router = express.Router();

const routes = [
  {
    path: "/user",
    route: userRotes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
