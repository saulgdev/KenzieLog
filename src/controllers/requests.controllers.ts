import { Response, Request } from "express";

import createRequestService from "../services/requests/createRequest.service";
import deleteRequestService from "../services/requests/deleteRequest.service";
import listAllRequestService from "../services/requests/listAllRequest.service";
import getRequestService from "../services/requests/listRequestUser.service";
import updateRequestService from "../services/requests/updateRequest.service";

const createRequestController = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await createRequestService(body);

  return res.status(201).json(data);
};

const getRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getRequestService(id);

  return res.status(200).json(data);
};

const listAllRequestController = async (req: Request, res: Response) => {
  const data = await listAllRequestService();
  return res.status(200).json(data);
};

const updateRequestController = async (req: Request, res: Response) => {
  const { body, params } = req;

  const data = await updateRequestService(body, params.id);

  return res.status(200).json(data);
};

const deleteRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteRequestService(id);

  return res.status(200);
};

export {
  createRequestController,
  getRequestController,
  listAllRequestController,
  updateRequestController,
  deleteRequestController,
};
