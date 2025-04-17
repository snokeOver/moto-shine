import express from "express";
import { userController } from "./user.controller";
const userRotes = express.Router();

userRotes.post("/", userController.createAdmin);

export default userRotes;
