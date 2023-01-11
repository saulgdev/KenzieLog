import { Router } from "express";

const usersRoutes = Router();

usersRoutes.post("");
usersRoutes.get("");
usersRoutes.get("/:id"); // Should be able to search a user per ID.
usersRoutes.get("/:id/requests"); // Should be able to search a orders that belonging a user.
usersRoutes.patch("");
usersRoutes.delete("");

export default usersRoutes;
