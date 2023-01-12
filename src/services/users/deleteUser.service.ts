import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entitiy"
import { AppError } from "../../error/appError"

const deleteUserService = async (params) => {
    const dataRepository = AppDataSource.getRepository(Users)

    const userDelete: any = await dataRepository.findOneBy({
        id: params.id
    })

    if(!userDelete) {
        throw new AppError("O USUÁRIO NÃO EXISTE!", 404)
    }

    if (!userDelete.isActive) {
        throw new AppError("O USUÁRIO JÁ ESTÁ DESATIVADO!", 400)
    }

    userDelete.isActive = false

    await dataRepository.save(userDelete)
    
    return 204
}

export default deleteUserService