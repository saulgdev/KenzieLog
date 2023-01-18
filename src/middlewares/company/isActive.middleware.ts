import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../error/appError";

const companyIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const companyRepo = AppDataSource.getRepository(Company);
  const company = await companyRepo.findOneBy({ id });

  if (!company.isActive) {
    throw new AppError("Company is already not active.", 409);
  }

  next();
};

export default companyIsActiveMiddleware
