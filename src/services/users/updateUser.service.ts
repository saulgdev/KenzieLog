import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entitiy"
import { AppError } from "../../error/appError"

const updateUserService = async (params, body) => {
    const dataRepository = AppDataSource.getRepository(Users)

    const user = await dataRepository.findOneBy({
        id: params.id
    })

    if (!user) {
        throw new AppError("Usuário não existe.", 401)
    }

    const updateUser = dataRepository.create({
        ...user,
        ...body,
        password: undefined,
    })

    await dataRepository.save(updateUser)

    return updateUser
}

export default updateUserService