import { Router } from "express";
import loginUserController from "../controllers/login.controllers";
import validateSchemaMiddleware from "../middlewares/global/validateSchema.middleware";
import { verifyExistsUserMiddleware } from "../middlewares/users/verifyUsers.middlewares";
import { loginUserSchema } from "../schemas/users.schemas";

const loginRoutes = Router();

loginRoutes.post(
  "",
  validateSchemaMiddleware(loginUserSchema),
  verifyExistsUserMiddleware,
  loginUserController
);

export default loginRoutes;
