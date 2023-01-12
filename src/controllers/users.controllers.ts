import { Response, Request } from "express";
import { ICreateUser } from "../interfaces/users/users.interfaces";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import searchUserService from "../services/users/searchUser.service";
import updateUserService from "../services/users/updateUser.service";

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
  console.log(req.params)
  const user = await searchUserService(req.params)
  return res.status(201).json(user)
}

const searchOrderByUserController = async (req: Request, res: Response) => {

}

const updateUserController = async (req: Request, res: Response) => {
  const updatedUser = await updateUserService(req.params, req.body)
  return res.status(201).json(updatedUser)
}

const deleteUserController = async (req: Request, res: Response) => {

}


export {createUserController, listUsersController, searchUserController, searchOrderByUserController, updateUserController, deleteUserController}
