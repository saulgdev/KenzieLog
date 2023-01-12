import { Request, Response, NextFunction } from "express";
import { AppError } from "../../error/appError";

export const verifyRequestUpdateDataMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {body} = req
  const keys = Object.keys(body);

    if(keys.includes("id") || keys.includes("createdAt") || keys.includes("updateAt") || keys.includes("userId")) {
        throw new AppError("Not authorized", 401)
    }
  return next();
};