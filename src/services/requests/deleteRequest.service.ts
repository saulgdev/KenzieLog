import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { AppError } from "../../error/appError";

const deleteRequestService = async (requestId: string): Promise<void> => {

    // const requestRepository = AppDataSource.getRepository(Requests);
    // const request = await requestRepository.findOneBy({
    //     id: requestId
    // });

    // if(!request.isActive) {
    //     throw new AppError("Request already delete", 400);
    // }

    // await requestRepository.softDelete(request.id)
    // await requestRepository.save({...request, isaActive: false})
};

export default deleteRequestService;
