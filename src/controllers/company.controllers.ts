import { Response, Request } from "express";
import { ICreateCompany } from "../interfaces/company/company.interfaces";
import createCompanyService from "../services/company/createCompany.service";
import deactivateCompanyService from "../services/company/deactiveCompany.service";
import editCompanyService from "../services/company/editCompany.service";
import getCompaniesService from "../services/company/getCompanies.service";
import getCompanyService from "../services/company/getCompany.service";

const createCompanyController = async (req: Request, res: Response) => {
  const clientData = req.validatedBody as ICreateCompany;
  const data = await createCompanyService(clientData);
  return res.status(201).json(data);
};

const getCompaniesController = async (req: Request, res: Response) => {
  const data = await getCompaniesService();
  return res.status(200).json(data);
};

const getCompanyController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getCompanyService(id);
  return res.status(200).json(data);
};

const editCompanyController = async (req: Request, res: Response) => {
  const data = await editCompanyService();
  return res.status(200).json(data);
};

const deactivateCompanyController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await deactivateCompanyService(id);
  return res.status(204).json(data);
};

export {
  createCompanyController,
  getCompaniesController,
  getCompanyController,
  editCompanyController,
  deactivateCompanyController,
};
