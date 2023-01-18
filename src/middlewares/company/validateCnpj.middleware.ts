import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../error/appError";

const validateCnpjMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cnpj } = req.validatedBody;
  const companyRepo = AppDataSource.getRepository(Company);
  const cnpjExists = await companyRepo.findOneBy({ cnpj });
  
  if (cnpjExists) {
    throw new AppError("Cnpj is already registered.");
  }

  next();
};

export default validateCnpjMiddleware;
