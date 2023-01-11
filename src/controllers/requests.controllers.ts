import { Response, Request } from "express";

import createRequestService from "../services/requests/createRequest.service";
import deleteRequestService from "../services/requests/deleteRequest.service";
import listAllRequestService from "../services/requests/listAllRequest.service";
import listRequestUserService from "../services/requests/listRequestUser.service";
import updateRequestAdmiService from "../services/requests/updateRequestAdmi.service";
import updateRequestUserService from "../services/requests/updateRequestUser.service";

const createRequestController = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await createRequestService(body);

  return res.status(201).json(data);
};

const listRequestUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await listRequestUserService(id);

  return res.status(200).json(data);
};

const listAllRequestController = async (req: Request, res: Response) => {
  const data = await listAllRequestService();
  return res.status(200).json(data);
};

const updateRequestUserController = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await updateRequestUserService(body);

  return res.status(200).json(data);
};

const updateRequestAdmiController = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await updateRequestAdmiService(body);

  return res.status(200).json(data);
};

const deleteRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteRequestService(id);

  return res.status(200);
};

export {
  createRequestController,
  listRequestUserController,
  listAllRequestController,
  updateRequestUserController,
  updateRequestAdmiController,
  deleteRequestController,
};
