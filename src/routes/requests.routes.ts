import { Router } from "express";

const requestRoutes = Router();

requestRoutes.post("");
requestRoutes.get(""); 
requestRoutes.get("/:id") // Should be able to search a order per id;
requestRoutes.patch("");
requestRoutes.delete("");

export default requestRoutes