import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { AppError } from "../../error/appError";

const validateCompanyIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const isUuid = regexExp.test(id);

  if (!isUuid) {
    throw new AppError("Invalid uuid.", 401);
  }

  const companyRepo = AppDataSource.getRepository(Company);
  const companyExists = await companyRepo.findOneBy({ id });

  if (!companyExists) {
    throw new AppError("Company not registered.", 404);
  }

  next();
};

export default validateCompanyIdMiddleware;
