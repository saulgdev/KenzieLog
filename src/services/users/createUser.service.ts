import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Users } from "../../entities/users.entitiy";
import { ICreateUser } from "../../interfaces/users.interfaces";
import { showUserWithoutPass } from "../../schemas/users.schemas";

const createUserService = async (payload: ICreateUser) => {
  const userRepo = AppDataSource.getRepository(Users);
  const addressRepo = AppDataSource.getRepository(Address)
//   const newUser = userRepo.create(payload);
//   await userRepo.save(newUser);

//   const userWithoutPass = showUserWithoutPass.validate(newUser, {
//     stripUnknown: true,
//   });

  return "oi";
};

export default createUserService;
