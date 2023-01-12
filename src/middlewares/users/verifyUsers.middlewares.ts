import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/appError";
// import { decode, JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Users } from "../../entities/users.entitiy";
import { SchemaOf } from "yup";
import { IUserUpdate } from "../../interfaces/users/users.interfaces";

const userRepo = AppDataSource.getRepository(Users);

const verifyExistsUserMiddleware = async (
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

const verifyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded: any) => {
      req.user = {
        id: decoded.sub,
        isAdm: decoded.isAdm,
      };

      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const verifyAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;

  if (!isAdm) {
    return res.status(403).json({ message: "unauthorized" });
  }
  next();
};

const verifyActiveUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const active = req.body.isActive;

  if (active || active === false) {
    return res.status(401).json({ message: "Bad request" });
  }

  next();
};

const verifyIdUpdateAuthAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.body.id;

  if (id || id === false) {
    return res.status(401).json({
      message: "User is not admin!",
    });
  }

  return next();
};

const verifyUpdateAuthAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;
  const body = req.body.isAdm;

  if (body || body === false) {
    return res.status(401).json({
      message: "User is not admin!",
    });
  }
  if (!isAdm) {
    return res.status(401).json({
      message: "User is not admin!",
    });
  }
  return next();
};

const verifyUpdateUserMiddleware =
  (schema: SchemaOf<IUserUpdate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const validatedData = await schema.validate(data, {
      stripUnknown: true,
    });

    req.userUpdate = validatedData;

    next();
  };

export {
  verifyExistsUserMiddleware,
  verifyAuthMiddleware,
  verifyAdmMiddleware,
  verifyActiveUserMiddleware,
  verifyIdUpdateAuthAdmMiddleware,
  verifyUpdateAuthAdmMiddleware,
  verifyUpdateUserMiddleware,
};
