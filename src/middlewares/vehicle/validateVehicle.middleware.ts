import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Vehicles } from "../../entities/vehicles.entity";
import { AppError } from "../../error/appError";

const validateVehicleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const vehicleRepo = AppDataSource.getRepository(Vehicles);
  const vehicle = await vehicleRepo.findOneBy({ id });

  if (!vehicle) {
    throw new AppError("Vehicle is not registered.", 404);
  }

  next();
};

export default validateVehicleMiddleware;
