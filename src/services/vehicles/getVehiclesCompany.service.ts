import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";

const getVehiclesService = async (id: string) => {
  const companyRepo = AppDataSource.getRepository(Company);
  const companyVehicles = await companyRepo
    .createQueryBuilder("company")
    .innerJoinAndSelect("company.vehicles", "vehicles")
    .where("company.id = :companyId", { companyId: id })
    .getOne();

  return companyVehicles;   
};

export default getVehiclesService;
