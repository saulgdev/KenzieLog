import { Router } from "express";

import {
  createRequestController,
  getRequestController,
  listAllRequestController,
  updateRequestController,
  deleteRequestController,
} from "../controllers/requests.controllers";

import { verifyRequestUpdateDataMiddleware } from "../middlewares/requests/verifyRequest.middlewares";

const requestsRoutes = Router();

requestsRoutes.post("", createRequestController);
requestsRoutes.get("", listAllRequestController);
requestsRoutes.get("/:id", getRequestController); // Should be able to search a order per id;
requestsRoutes.patch(
  "",
  verifyRequestUpdateDataMiddleware,
  updateRequestController
);
requestsRoutes.delete("", deleteRequestController);

export default requestsRoutes;
