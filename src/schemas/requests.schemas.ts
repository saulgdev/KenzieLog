import * as yup from "yup";
import { SchemaOf } from "yup";
import { IRequestResponse } from "../interfaces/requests/requests.interfaces";

export const createRequestSchema: SchemaOf<IRequestResponse> = yup
  .object()
  .shape({
    name: yup.string().required(),
    status: yup.string().required(),
    deadline: yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    user: yup.object().shape({
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
    }),
  });
