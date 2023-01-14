import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { Users } from "../../entities/users.entitiy";
import { AppError } from "../../error/appError";

const listAllUserRequestService = async (
  userId: string
): Promise<Requests[]> => {
  const userRepository = AppDataSource.getRepository(Users);
  const userExist = userRepository.findOneBy({
    id: userId,
  });

  if (!userExist) {
    throw new AppError("User not exists", 404);
  }

  const requestRepository = AppDataSource.getRepository(Requests);
  const requestAlreadyExists = requestRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!requestAlreadyExists) {
    throw new AppError("Request not exists", 404);
  }

  return requestAlreadyExists;
};

export default listAllUserRequestService;
