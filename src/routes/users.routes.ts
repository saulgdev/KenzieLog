import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import validateSchemaMiddleware from "../middlewares/global/validateSchema.middleware";

const usersRoutes = Router();

usersRoutes.post("", validateSchemaMiddleware, createUserController);
usersRoutes.get("");
usersRoutes.get("/:id"); // Should be able to search a user per ID.
usersRoutes.get("/:id/requests"); // Should be able to search a orders that belonging a user.
usersRoutes.patch("");
usersRoutes.delete("");

export default usersRoutes;
