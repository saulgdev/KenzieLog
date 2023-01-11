import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { AppError } from "../../error/appError";
import { IRequest } from "../../interfaces/requests.interfaces";

const createRequestService = async (data: IRequest) => {
  
  const { name } = data;
  const requestRepository = AppDataSource.getRepository(Requests);
  const requestAlreadyExists = requestRepository.findOneBy({
    name: name,
  });

  if (requestAlreadyExists) {
    throw new AppError("Request already exists", 409);
  }

  const createdRequest = requestRepository.create(data);

  const returned = await requestRepository.save(createdRequest);

  return returned;
};

export default createRequestService;
