import { request } from "http";
import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { Users } from "../../entities/users.entitiy";
import { AppError } from "../../error/appError";
import { ICreateRequest } from "../../interfaces/requests/requests.interfaces";

const createRequestService = async (data: ICreateRequest) => {
  const { name, userId, weight, cubicMeters } = data;
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

  const now = new Date();

  now.setDate(now.getDate() + 7);

  const dataCreate = {
    name,
    weight,
    cubicMeters,
    deadline: now,
    user: { ...user, password: undefined },
    address: user.address,
  };

  const createdRequest = requestRepository.create(dataCreate);

  await requestRepository.save(createdRequest);

  const response = await requestRepository
    .createQueryBuilder("requests")
    .innerJoinAndSelect("requests.user", "users")
    .innerJoinAndSelect("users.address", "address")
    .where("requests.id = :id", { id: createdRequest.id })
    .getMany();

  return response;
};

export default createRequestService;
