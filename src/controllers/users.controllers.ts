import { Response, Request } from "express";
import { ICreateUser } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { validatedBody } = req;
  const data = await createUserService(validatedBody as ICreateUser);

  return res.status(201).json(data);
};

export { createUserController };
