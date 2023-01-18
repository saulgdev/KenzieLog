import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";

const deactivateCompanyService = async (id: string) => {
  const companyRepo = AppDataSource.getRepository(Company);
  await companyRepo.save({ id, isActive: false });
  return;
};

export default deactivateCompanyService;
