import { ILoginUser } from "../../interfaces/login.interfaces";

declare global {
  namespace Express {
    interface Request {
      validatedBody: ICreateUser | ILoginUser;
      validatedUser: IUserCompleted;
    }
  }
}

export {};
