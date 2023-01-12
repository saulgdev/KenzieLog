import { Router } from "express";
import { createUserController, listUsersController, searchUserController, updateUserController } from "../controllers/users.controllers";
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
// usersRoutes.get("", verifyAuthMiddleware, verifyAdmMiddleware, listUsersController);
usersRoutes.get("", listUsersController);
usersRoutes.get("/:id", searchUserController); // Should be able to search a user per ID.
usersRoutes.get("/:id/requests"); // Should be able to search a orders that belonging a user.
usersRoutes.patch("/:id", updateUserController);
usersRoutes.delete("");

export default usersRoutes;
