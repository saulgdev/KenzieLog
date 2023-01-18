import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ICreateCompany,
  IEditCompany,
} from "../interfaces/company/company.interfaces";

const createCompanySchema: SchemaOf<ICreateCompany> = yup.object().shape({
  name: yup.string().required(),
  openingTime: yup.string().required(),
  cnpj: yup.string().required(),
  address: yup
    .object({
      district: yup.string().required(),
      zipCode: yup.string().max(8).required(),
      number: yup.string().notRequired(),
      city: yup.string().required(),
      state: yup.string().max(2).required(),
    })
    .required(),
  contacts: yup
    .object({
      phoneNumber: yup.string().required(),
      email: yup.string().required(),
    })
    .required(),
});

const editCompanySchema: SchemaOf<IEditCompany> = yup.object().shape({
  openingTime: yup.string().required(),
});

export { createCompanySchema, editCompanySchema };
