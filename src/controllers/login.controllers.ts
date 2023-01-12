import { Request, Response } from "express";
import { AppError } from "../error/appError";
import { handler } from "../error/handler";
import { IUserLogin } from "../interfaces/session/login.interfaces";
import loginUserService from "../services/login/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as IUserLogin;

    const token = await loginUserService({ email, password });

    return res.status(200).send({ token });
  } catch (error) {
    if (error instanceof AppError) {
      handler(error, req, res, null);
    }
  }
};

export default loginUserController;
