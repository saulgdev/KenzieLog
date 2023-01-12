import AppDataSource from "../../data-source";
import { Requests } from "../../entities/requests.entity";
import { AppError } from "../../error/appError";
import { IRequestUpdate } from "../../interfaces/requests.interfaces";

const updateRequestAdmiService = async (data: IRequestUpdate) => {

    const keys = Object.keys(data);

    if(keys.includes("id") || keys.includes("createdAt") || keys.includes("updateAt") || keys.includes("userId")) {
        throw new AppError("Not authorized", 401)
    }


    // const requestRepository = AppDataSource.getRepository(Requests);
    // const listRequests = requestRepository.findOneBy({
    //     id:
    // }) 
};

export default updateRequestAdmiService;
