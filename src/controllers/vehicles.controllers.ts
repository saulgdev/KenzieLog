import { Request, Response } from "express";
import { ICreateVehicle } from "../interfaces/vehicles/vehicles.interface";
import createVehiclesService from "../services/vehicles/createVehicles.service";
import deleteVehicleService from "../services/vehicles/deleteVehicles.service";
import getVehiclesService from "../services/vehicles/getVehiclesCompany.service";

const createVehiclesController = async (req: Request, res: Response) => {
  const clientData = req.validatedBody as ICreateVehicle;
  const { id } = req.params;

  const data = await createVehiclesService(clientData, id);
  return res.status(201).json(data);
};

const getVehiclesCompanyController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getVehiclesService(id);
  return res.status(200).json(data);
};

const deleteVehicleController = async (req: Request, res: Response) => {
  const data = await deleteVehicleService();
  return res.status(204).json(data);
};

export {
  createVehiclesController,
  getVehiclesCompanyController,
  deleteVehicleController,
};
