import { Router } from "express";
import {
  createVehiclesController,
  deleteVehicleController,
  getVehiclesCompanyController,
} from "../controllers/vehicles.controllers";
import companyIsActiveMiddleware from "../middlewares/company/isActive.middleware";
import validateCompanyIdMiddleware from "../middlewares/company/validateId.middleware";
import isUuidMiddleware from "../middlewares/global/isUuid.middleware";
import validateSchemaMiddleware from "../middlewares/global/validateSchema.middleware";
import {
  verifyAdmMiddleware,
  verifyAuthMiddleware,
} from "../middlewares/users/verifyUsers.middlewares";
import validateVehicleMiddleware from "../middlewares/vehicle/validateVehicle.middleware";
import { createVehicleSchema } from "../schemas/vehicles.schemas";

const vehiclesRoutes = Router();

vehiclesRoutes.post(
  "/company/:id",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  validateCompanyIdMiddleware,
  companyIsActiveMiddleware,
  validateSchemaMiddleware(createVehicleSchema),
  createVehiclesController
);

vehiclesRoutes.get(
  "/company/:id",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  validateCompanyIdMiddleware,
  companyIsActiveMiddleware,
  getVehiclesCompanyController
);

vehiclesRoutes.delete(
  "/:id",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  isUuidMiddleware,
  validateVehicleMiddleware,
  deleteVehicleController
);

export default vehiclesRoutes;
