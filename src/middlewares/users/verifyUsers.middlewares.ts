import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/appError";
import { decode, JwtPayload } from "jsonwebtoken";
import { Users } from "../../entities/users.entitiy";

const userRepo = AppDataSource.getRepository(Users);

export const verifyExistsUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await userRepo.findOneBy({ email: req.body.email });
  const { originalUrl: path } = req;

  if (users && path == "/users") {
    throw new AppError("Já existe um usuário com este email", 409);
  }

  if (!users && path == "/login") {
    throw new AppError("Email ou senha inválidos.", 403);
  }

  req.validatedUser = users;
  return next();
};

export const verifyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new AppError("Usuário sem autorização", 401);
  }
  return next();
};

export const verifyAdmMiddleware = async (
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
