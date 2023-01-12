export interface IUserLogin {
  email: string;
  password: string;
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
