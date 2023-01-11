export interface ICreateUserAddress {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}
export interface ICreateUserAddressSchema {
  id: string;
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  address: ICreateUserAddress;
}

export interface IUserWithoutPass {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  address: ICreateUserAddressSchema;
}
