import { Router } from "express";
import loginUserController from "../controllers/login.controllers";

const loginRoutes = Router();

loginRoutes.post("", loginUserController);

export default loginRoutes;
