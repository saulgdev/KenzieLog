import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { Vehicles } from "../../entities/vehicles.entity";
import { ICreateVehicle } from "../../interfaces/vehicles/vehicles.interface";

const createVehiclesService = async (payload: ICreateVehicle, id: string) => {
  const vehicleRepo = AppDataSource.getRepository(Vehicles);
  const companyRepo = AppDataSource.getRepository(Company);
  const company = await companyRepo.findOneBy({ id });
  const vehicleRepoInstance = vehicleRepo.create({
    ...payload,
    companyWorkPlace: company,
  });

  await vehicleRepo.save(vehicleRepoInstance);
  return vehicleRepoInstance;
};

export default createVehiclesService;
