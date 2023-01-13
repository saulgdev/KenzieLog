import { IUserWithoutPass } from "../users/users.interfaces";

export interface ICreateRequest {
  name: string;
  weight:number
  meterCubic:number
  userId: string;
}

export interface IRequestResponse {
  name: string;
  status: string;
  deadline: string;
  weight:number
  meterCubic:number
  createdAt: Date;
  updatedAt: Date;
  user: IUserWithoutPass;
}

export interface IRequestUpdate {
  name?: string;
  status?: string;
  deadline?: string;
  weight?:number
  meterCubic?:number
}
