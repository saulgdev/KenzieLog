import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { AppError } from "../../error/appError";

const getRequestService = async (id: string): Promise<Requests> => {
      const requestRepository = AppDataSource.getRepository(Requests);
    const requestAlreadyExists = requestRepository.findOneBy({
        id: id
    });

    if(!requestAlreadyExists) {
        throw new AppError("Request not exists", 404)
    }

    return requestAlreadyExists
};

export default getRequestService;
