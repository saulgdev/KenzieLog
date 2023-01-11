import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateUser, IUserWithoutPass } from "../interfaces/users.interfaces";

const createUserSchema: SchemaOf<ICreateUser> = yup.object().shape({
  name: yup.string().required().max(72),
  email: yup.string().email().required().max(256),
  password: yup.string().required().max(65),
  isAdm: yup.boolean().required(),
  address: yup.object({
    district: yup.string().required(),
    zipCode: yup.string().required().max(8),
    number: yup.string().notRequired(),
    city: yup.string().required(),
    state: yup.string().required().max(2),
  }),
});

const showUserWithoutPass: SchemaOf<IUserWithoutPass> = yup.object().shape({
  address: yup.object({
    id: yup.string().required(),
    district: yup.string().required(),
    zipCode: yup.string().required().max(8),
    number: yup.string().notRequired(),
    city: yup.string().required(),
    state: yup.string().required().max(2),
  }),
  isActive: yup.boolean().required(),
  isAdm: yup.boolean().required(),
  updatedAt: yup.string().required(),
  createdAt: yup.string().required(),
  email: yup.string().email().required().max(256),
  name: yup.string().required().max(72),
  id: yup.string().required(),
});

export { createUserSchema, showUserWithoutPass };
