import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/appError";
import { decode, JwtPayload } from "jsonwebtoken";
import { Users } from "../../entities/users.entitiy";
const userRepo = AppDataSource.getRepository(Users);

export const verifyExistsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await userRepo.findOneBy({ email: req.body.email });
  if (users) {
    throw new AppError("Já existe um usuário com este email", 409);
  }
  return next();
};

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new AppError("Usuário sem autorização", 401);
  }
  return next();
};

export const verifyAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  const isAdm = decode(token) as JwtPayload;

  if (!isAdm.isAdm) {
    throw new AppError("Usuário sem autorização", 403);
  }
  return next();
};
