import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Company } from "../../entities/company.entity";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../error/appError";
import { ICreateCompany } from "../../interfaces/company/company.interfaces";

const createCompanyService = async (payload: ICreateCompany) => {
  const { contacts, address } = payload;
  const { zipCode } = address;
  const { phoneNumber } = contacts;

  const addressRepo = AppDataSource.getRepository(Address);
  const contactRepo = AppDataSource.getRepository(Contact);
  const companyRepo = AppDataSource.getRepository(Company);

  const contactExists = await contactRepo.findOneBy({ phoneNumber });
  const addressExists = await addressRepo.findOneBy({ zipCode });

  if (contactExists) {
    throw new AppError("Phone number is already registered.");
  }

  if (addressExists) {
    throw new AppError("Address is already registered.");
  }

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
