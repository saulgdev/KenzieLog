import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateUser, IUserWithoutPass } from "../interfaces/users.interfaces";

const createUserSchema: SchemaOf<ICreateUser> = yup.object().shape({
  name: yup.string().required().max(72),
  email: yup.string().email().required().max(256),
  password: yup.string().required().max(65),
  isAdm: yup.boolean().required(),
});

const showUserWithoutPass: SchemaOf<IUserWithoutPass> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
  id: yup.string().required(),
  isActive: yup.boolean().required(),
  createdAt: yup.string().required(),
  updatedAt: yup.string().required(),
});

export { createUserSchema, showUserWithoutPass };
