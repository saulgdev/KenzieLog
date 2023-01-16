import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { Users } from "../../entities/users.entitiy";
import { AppError } from "../../error/appError";
import { ICreateRequest } from "../../interfaces/requests/requests.interfaces";

const createRequestService = async (data: ICreateRequest) => {
  const { name, userId, weight, cubicMeters, distance } = data;
  const requestRepository = AppDataSource.getRepository(Requests);
  const requestAlreadyExists = await requestRepository.findOneBy({
    name: name,
  });
  if (requestAlreadyExists) {
    throw new AppError("Request already exists", 409);
  }

  const userRepository = AppDataSource.getRepository(Users);
  const user = await userRepository.findOneBy({
    id: userId,
  });
  if (!user) {
    throw new AppError("User not exists", 404);
  }

  let time = Math.ceil(distance/80)
  if(time >= 1) {
    time = 2
  }

  const now = new Date();

  now.setDate(now.getDate() + time);

  const dataCreate = {
    name,
    weight,
    cubicMeters,
    deadline: now,
    user: {...user}
  }

  const createdRequest = requestRepository.create(dataCreate);

  await requestRepository.save(createdRequest);
  return createdRequest;
};

export default createRequestService;
