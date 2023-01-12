import { Response, Request } from "express";
import { ICreateUser } from "../interfaces/users/users.interfaces";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";

const createUserController = async (req: Request, res: Response) => {
  const { validatedBody } = req;
  const data = await createUserService(validatedBody as ICreateUser);
  return res.status(201).json(data);
}

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService()
  return res.status(201).json(users)
}

const searchUserController = async (req: Request, res: Response) => {

}

const searchOrderByUserController = async (req: Request, res: Response) => {

}

const updateUserController = async (req: Request, res: Response) => {

}

const deleteUserController = async (req: Request, res: Response) => {

}


export {createUserController, listUsersController, searchUserController, searchOrderByUserController, updateUserController, deleteUserController}
