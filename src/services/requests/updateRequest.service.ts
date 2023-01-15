import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { AppError } from "../../error/appError";
import { IRequestUpdate } from "../../interfaces/requests/requests.interfaces";

const updateRequestService = async (
  data: IRequestUpdate,
  requestId: string
) => {
  const requestRepository = AppDataSource.getRepository(Requests);
  const request = await requestRepository.findOneBy({
    id: requestId,
  });

  if (!request) {
    throw new AppError("Request not exists", 404);
  }

  await requestRepository.update(requestId, data);

  const response = await requestRepository.findOneBy({
    id: requestId
  })

  return response;
};

export default updateRequestService;
