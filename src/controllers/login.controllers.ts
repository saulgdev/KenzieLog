import { Request, Response } from "express";
import { ILoginUser } from "../interfaces/login.interfaces";
import { IUserCompleted } from "../interfaces/users.interfaces";
import loginUserService from "../services/login/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const validatedBody: ILoginUser = req.validatedBody;
  const comparePayload: IUserCompleted = req.validatedUser
  const data = await loginUserService(validatedBody, comparePayload);

  return res.status(200).json(data);
};

export default loginUserController;
