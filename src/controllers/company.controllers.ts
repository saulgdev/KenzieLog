import { Response, Request } from "express";
import { ICreateCompany } from "../interfaces/company/company.interfaces";
import createCompanyService from "../services/company/createCompany.service";

const createCompanyController = async (req: Request, res: Response) => {
  const clientData = req.validatedBody as ICreateCompany;
  const data = await createCompanyService(clientData);
  return res.status(201).json(data);
};

export { createCompanyController };
