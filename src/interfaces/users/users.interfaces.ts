import { iAddressRequest } from "../address/address.interfaces";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  address: iAddressRequest
}

export interface IUserWithoutPass {
  name: string;
  email: string;
  isAdm: boolean;
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  address: iAddressRequest
}

export interface IUserUpdate{
  name?: string
  email?: string
  passowrd?: string
  address?: iAddressRequest
}

export interface IUserResponse{
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  isAdm: boolean;
  isActive: boolean;
  address: iAddressRequest
}
