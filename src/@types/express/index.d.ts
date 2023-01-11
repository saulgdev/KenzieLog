import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      validatedBody: object;
      user: {
        isAdm: boolean;
        id: number;
      };
      userUpdate: {
        email: string;
        name: string;
        password: string;
      };
    }
  }
}
