import { Router } from "express";
import { createCompanyController } from "../controllers/company.controllers";
import validateCnpjMiddleware from "../middlewares/company/validateCnpj.middleware";
import validateSchemaMiddleware from "../middlewares/global/validateSchema.middleware";
import {
  verifyAdmMiddleware,
  verifyAuthMiddleware,
} from "../middlewares/users/verifyUsers.middlewares";
import { createCompanySchema } from "../schemas/company.schemas";

const companyRoutes = Router();

companyRoutes.post(
  "",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  validateSchemaMiddleware(createCompanySchema),
  validateCnpjMiddleware,
  createCompanyController
);

export default companyRoutes;
