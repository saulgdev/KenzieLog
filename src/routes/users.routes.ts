import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, searchUserController, updateUserController } from "../controllers/users.controllers";
import validateSchemaMiddleware from "../middlewares/global/validateSchema.middleware";
import { verifyAuthMiddleware, verifyAdmMiddleware, verifyExistsUserMiddleware } from "../middlewares/users/verifyUsers.middlewares";
import { createUserSchema } from "../schemas/users.schemas";

const usersRoutes = Router();

usersRoutes.post(
  "",
  validateSchemaMiddleware(createUserSchema),
  verifyExistsUserMiddleware,
  createUserController
);
usersRoutes.get("", verifyAuthMiddleware, verifyAdmMiddleware, listUsersController);
usersRoutes.get("/:id", searchUserController); // Should be able to search a user per ID.
usersRoutes.patch("/:id", verifyAuthMiddleware, verifyAdmMiddleware, updateUserController);
usersRoutes.delete("/:id", verifyAuthMiddleware, verifyAdmMiddleware, deleteUserController);

export default usersRoutes;
