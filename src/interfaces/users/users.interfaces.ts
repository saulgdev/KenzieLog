import { iAddressRequest } from "../address/address.interfaces";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  address: iAddressRequest;
}

export interface IUserWithoutPass {
  name: string;
  email: string;
  isAdm: boolean;
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  address: iAddressRequest;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  passowrd?: string;
  address?: iAddressRequest;
}

export interface IUserCompleted {
  id: string;
  password: string;
  name: string;
  email: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserPatch {
    id: string
    name: string
    email: string
    isAdm: boolean
    createdAt: Date
    updatedAt: Date
}
