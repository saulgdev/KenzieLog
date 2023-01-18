import AppDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";

const getCompaniesService = async () => {
  const companyRepo = AppDataSource.getRepository(Company);
  const companies = await companyRepo
    .createQueryBuilder("companies")
    .innerJoinAndSelect("companies.address", "address")
    .innerJoinAndSelect("companies.contacts", "contacts")
    .getMany();

  return companies;
};

export default getCompaniesService;
