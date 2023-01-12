import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Users } from "../../entities/users.entitiy";
import { showUserWithoutPass } from "../../schemas/users.schemas";
import { ICreateUser } from "../../interfaces/users.interfaces";

const createUserService = async (payload: ICreateUser) => {
  const { name, email, password, isAdm, address } = payload;
  const addressRepo = AppDataSource.getRepository(Address);
  const newAddress = addressRepo.create(address);
  await addressRepo.save(newAddress);

  const userRepo = AppDataSource.getRepository(Users);
  const user = { name, email, password, isAdm, address: newAddress };
  const newUser = userRepo.create(user);
  await userRepo.save(newUser);

  const userWithoutPass = showUserWithoutPass.validate(newUser, {
    stripUnknown: true,
  });

  console.log(userWithoutPass)

  return userWithoutPass;
};

export default createUserService;
