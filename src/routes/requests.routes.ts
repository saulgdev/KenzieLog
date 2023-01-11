import { Router } from "express";

const requestsRoutes = Router();

requestsRoutes.post("");
requestsRoutes.get(""); 
requestsRoutes.get("/:id") // Should be able to search a order per id;
requestsRoutes.patch("");
requestsRoutes.delete("");

export default requestsRoutes