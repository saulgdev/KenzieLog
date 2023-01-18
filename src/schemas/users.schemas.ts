import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../interfaces/session/login.interfaces";
import {
  ICreateUser,
  IUserWithoutPass,
  IUserPatch
} from "../interfaces/users/users.interfaces";

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

const loginUserSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const userWithoutPasswordArraySchema: SchemaOf<IUserWithoutPass[]> =
  yup.array(showUserWithoutPass);

const userPatchSchema: SchemaOf<IUserPatch> = yup.object().shape({
    id: yup.string().optional(),
    name: yup.string().required(),
    email: yup.string().required(),
    isAdm: yup.boolean().optional(),
    createdAt: yup.date().optional(),
    updatedAt: yup.date().optional()
})

export {
  createUserSchema,
  showUserWithoutPass,
  loginUserSchema,
  userWithoutPasswordArraySchema,
  userPatchSchema
};
