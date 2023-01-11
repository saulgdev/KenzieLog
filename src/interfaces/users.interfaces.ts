export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IUserWithoutPass {
  name: string;
  email: string;
  isAdm: boolean;
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
