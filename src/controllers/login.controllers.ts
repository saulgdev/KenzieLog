import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/session/login.interfaces";
import { IUserCompleted } from "../interfaces/users/users.interfaces";
import loginUserService from "../services/login/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const validatedBody: IUserLogin = req.validatedBody;
  const comparePayload: IUserCompleted = req.validatedUser;
  const data = await loginUserService(validatedBody, comparePayload);

  return res.status(200).json(data);
};

export default loginUserController;
