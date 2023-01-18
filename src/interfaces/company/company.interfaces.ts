import { iAddressRequest } from "../address/address.interfaces";

export interface ICreateCompany {
  name: string;
  openingTime: string;
  cnpj: string;
  address: iAddressRequest;
  contacts: ICreateContact;
}

export interface ICreateContact {
  phoneNumber: string;
  email: string;
}

export interface IEditCompany {
  openingTime: string;
}
