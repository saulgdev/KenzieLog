import { AppError } from "../../error/appError";
import { IRequestUpdate } from "../../interfaces/requests.interfaces";

const updateRequestUserService = async (data: IRequestUpdate) => {
    const keys = Object.keys(data);

    if(keys.includes("id") || keys.includes("createdAt") || keys.includes("updateAt") || keys.includes("userId")) {
        throw new AppError("Not authorized", 401)
    }
};

export default updateRequestUserService;
