import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { AppError } from "../../error/appError";
import { IRequestUpdate } from "../../interfaces/requests/requests.interfaces";

const updateRequestService = async (
  data: IRequestUpdate,
  requestId: string
) => {
  const requestRepository = AppDataSource.getRepository(Requests);
  const request = requestRepository.findOneBy({
    id: requestId,
  });

  if (!request) {
    throw new AppError("Request not exists", 404);
  }

  const response = await requestRepository.update(requestId, data);

  return response;
};

export default updateRequestService;
