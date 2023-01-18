import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateVehicle } from "../interfaces/vehicles/vehicles.interface";

const createVehicleSchema: SchemaOf<ICreateVehicle> = yup.object().shape({
  name: yup.string().required(),
  sign: yup.string().required(),
  type: yup.string().required(),
});

export { createVehicleSchema };
