import * as express from "express";
import { ILoginUser } from "../../interfaces/login.interfaces";
import { iAddressRequest } from "../../interfaces/address/address.interfaces";

declare global {
  namespace Express {
    interface Request {
      validatedBody: ICreateUser | ILoginUser;
      validatedUser: IUserCompleted;
      user: {
        isAdm: boolean;
        id: string;
      };
      userUpdate: {
        email?: string;
        name?: string;
        password?: string;
        address?: iAddressRequest;
      };
    }
  }
}
