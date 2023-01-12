import { IUserWithoutPass } from "../users/users.interfaces";

export interface ICreateRequest {
  name: string;
  userId: string;
}

export interface IRequestResponse {
  name: string;
  status: string;
  deadline: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUserWithoutPass;
}

export interface IRequestUpdate {
  name?: string;
  status?: string;
  deadline?: string;
}
