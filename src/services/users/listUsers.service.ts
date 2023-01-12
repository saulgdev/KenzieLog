import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entitiy"

const listUsersService = async () => {
    const dataRepository = AppDataSource.getRepository(Users)
    const users = await dataRepository.find({
        select: {
            id: true,
            name: true,
            email: true,
            isAdm: true,
            isActive: true,
            createdAt: true,
            updatedAt: true
        },
    })
    return users
}


export default listUsersService