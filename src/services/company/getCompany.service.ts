import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";

const getCompanyService = async (companyId: string) => {
  const companyRepo = AppDataSource.getRepository(Company);
  const company = await companyRepo
    .createQueryBuilder("company")
    .innerJoinAndSelect("company.address", "address")
    .innerJoinAndSelect("company.contacts", "contacts")
    .where("company.id = :companyId", { companyId })
    .getOne();

  return company;
};

export default getCompanyService;
