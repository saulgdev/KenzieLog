import { IUserWithoutPass } from "../users/users.interfaces";

export interface ICreateRequest {
  name: string;
  weight: number;
  cubicMeters: number;
  userId: string;
  distance: number;
}

export interface IRequestResponse {
  name: string;
  status: string;
  deadline: string;
  weight: number;
  cubicMeters: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUserWithoutPass;
}

export interface IRequestUpdate {
  name?: string;
  status?: string;
  deadline?: string;
  weight?: number;
  cubicMeters?: number;
}
