import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";

const listAllRequestService = async (): Promise<Requests[]> => {
    const requestRepository = AppDataSource.getRepository(Requests);
    const listRequests = requestRepository.find();
  
    return listRequests 
};

export default listAllRequestService













