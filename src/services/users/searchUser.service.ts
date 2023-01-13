import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entitiy"

const searchUserService = async (params) => {
    const dataRepository = AppDataSource.getRepository(Users)
    const searchedUser = await dataRepository.findOneBy({
        id: params.id
    })
    return searchedUser
}

export default searchUserService