import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { Users } from "../../entities/users.entitiy";
import { AppError } from "../../error/appError";
import { ICreateRequest } from "../../interfaces/requests/requests.interfaces";

const createRequestService = async (data: ICreateRequest) => {
  
  const { name, userId } = data;
  const requestRepository = AppDataSource.getRepository(Requests);
  const requestAlreadyExists = requestRepository.findOneBy({
    name: name,
  });

  if (requestAlreadyExists) {
    throw new AppError("Request already exists", 409);
  }

  const userRepository = AppDataSource.getRepository(Users)
  const user = userRepository.findOneBy({
    id: userId
  })

  if(!user) {
    throw new AppError("User not exists", 404);
  }

  const createdRequest = requestRepository.create(data);

  const returned = await requestRepository.save(createdRequest);

  return returned;
};

export default createRequestService;
