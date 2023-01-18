import { Router } from "express";
import {
  createCompanyController,
  deactivateCompanyController,
  editCompanyController,
  getCompaniesController,
  getCompanyController,
} from "../controllers/company.controllers";
import companyIsActiveMiddleware from "../middlewares/company/isActive.middleware";
import validateCnpjMiddleware from "../middlewares/company/validateCnpj.middleware";
import validateCompanyIdMiddleware from "../middlewares/company/validateId.middleware";
import validateSchemaMiddleware from "../middlewares/global/validateSchema.middleware";
import {
  verifyAdmMiddleware,
  verifyAuthMiddleware,
} from "../middlewares/users/verifyUsers.middlewares";
import {
  createCompanySchema,
  editCompanySchema,
} from "../schemas/company.schemas";

const companyRoutes = Router();

companyRoutes.post(
  "",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  validateSchemaMiddleware(createCompanySchema),
  validateCnpjMiddleware,
  createCompanyController
);

companyRoutes.get(
  "",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  getCompaniesController
);

companyRoutes.get(
  "/:id",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  validateCompanyIdMiddleware,
  getCompanyController
);

companyRoutes.patch(
  "/:id",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  validateCompanyIdMiddleware,
  validateSchemaMiddleware(editCompanySchema),
  editCompanyController
);

companyRoutes.delete(
  "/:id",
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  validateCompanyIdMiddleware,
  companyIsActiveMiddleware,
  deactivateCompanyController
);

export default companyRoutes;
