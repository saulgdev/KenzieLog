import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Company } from "../../entities/company.entity";
import { Contact } from "../../entities/contact.entity";
import { ICreateCompany } from "../../interfaces/company/company.interfaces";

const createCompanyService = async (payload: ICreateCompany) => {
  const { contacts, address } = payload;

  const addressRepo = AppDataSource.getRepository(Address);
  const contactRepo = AppDataSource.getRepository(Contact);
  const companyRepo = AppDataSource.getRepository(Company);

  const addressRepoInstance = addressRepo.create(address);
  await addressRepo.save(addressRepoInstance);

  const contactRepoInstance = contactRepo.create(contacts);
  await contactRepo.save(contactRepoInstance);

  const company = {
    ...payload,
    address: addressRepoInstance,
    contacts: contactRepoInstance,
  };

  const companyRepoInstance = companyRepo.create(company);
  await companyRepo.save(companyRepoInstance);

  return companyRepoInstance;
};

export default createCompanyService;
