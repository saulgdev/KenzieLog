import { Router } from "express";
import { verifyAuthMiddleware } from "../middlewares/users/verifyUsers.middlewares";
import { verifyIsAdmMiddleware } from "../middlewares/requests/verifyRequest.middlewares";
import validateSchemaMiddleware from "../middlewares/global/validateSchema.middleware";
import { verifyRequestUpdateDataMiddleware } from "../middlewares/requests/verifyRequest.middlewares";
import { createRequestSchema } from "../schemas/requests.schemas";
import {
  createRequestController,
  getRequestController,
  listAllUserRequestController,
  listAllRequestController,
  updateRequestController,
  deleteRequestController,
} from "../controllers/requests.controllers";

const requestsRoutes = Router();

requestsRoutes.post("", verifyAuthMiddleware, createRequestController);
requestsRoutes.get(
  "",
  verifyAuthMiddleware,
  verifyIsAdmMiddleware,
  listAllRequestController
);

requestsRoutes.get(
  "/user/:userId",
  verifyAuthMiddleware,
  listAllUserRequestController
);

requestsRoutes.get("/:id", verifyAuthMiddleware, getRequestController); // Should be able to search a order per id;
requestsRoutes.patch(
  "/:id",
  verifyAuthMiddleware,
  verifyIsAdmMiddleware,
  verifyRequestUpdateDataMiddleware,
  validateSchemaMiddleware(createRequestSchema),
  updateRequestController
);
requestsRoutes.delete(
  "/:id",
  verifyAuthMiddleware,
  verifyIsAdmMiddleware,
  deleteRequestController
);

export default requestsRoutes;
