import * as yup from "yup";
import { SchemaOf } from "yup";
import { IRequestUpdate } from "../interfaces/requests/requests.interfaces";

export const createRequestSchema: SchemaOf<IRequestUpdate> = yup
  .object()
  .shape({
    name: yup.string(),
    status: yup.string(),
    deadline: yup.string(),
    weight: yup.number(),
    cubicMeters: yup.number(),
  });
