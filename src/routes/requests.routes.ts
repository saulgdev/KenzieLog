import { Router } from "express";

import {
  createRequestController,
  listRequestUserController,
  listAllRequestController,
  updateRequestUserController,
  updateRequestAdmiController,
  deleteRequestController
} from "../controllers/requests.controllers";

const requestsRoutes = Router();

requestsRoutes.post("", createRequestController);
requestsRoutes.get("", listAllRequestController);
requestsRoutes.get("/:id", listRequestUserController); // Should be able to search a order per id;
requestsRoutes.patch("", updateRequestAdmiController);
requestsRoutes.delete("", deleteRequestController);

export default requestsRoutes;
