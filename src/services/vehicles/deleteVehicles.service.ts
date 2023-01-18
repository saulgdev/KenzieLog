import AppDataSource from "../../data-source";
import { Vehicles } from "../../entities/vehicles.entity";

const deleteVehicleService = async (id: string) => {
  const vehicleRepo = AppDataSource.getRepository(Vehicles);
  const deleted = await vehicleRepo.delete({ id });

  return deleted;
};

export default deleteVehicleService;
