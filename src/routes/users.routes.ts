import { Router } from "express";

const userRoutes = Router();

userRoutes.post("");
userRoutes.get("");
userRoutes.get("/:id"); // Should be able to search a user per ID.
userRoutes.get("/:id/requests"); // Should be able to search a orders that belonging a user.
userRoutes.patch("");
userRoutes.delete("");

export default userRoutes;
