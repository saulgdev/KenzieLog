import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";

const editCompanyService = async (openingTime: string, id: string) => {
  const companyRepo = AppDataSource.getRepository(Company);
  const newOpeningTime = await companyRepo.save({ id, openingTime });

  return newOpeningTime;
};

export default editCompanyService;
