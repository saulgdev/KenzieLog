import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../error/appError";
import { ILoginUser } from "../../interfaces/login.interfaces";
import { IUserCompleted } from "../../interfaces/users.interfaces";

const loginUserService = async (
  payload: ILoginUser,
  comparePayload: IUserCompleted
) => {
  const { password: payloadPass, email } = payload;
  const { password: comparePass, id, isActive } = comparePayload;
  const hashCompare = compareSync(payloadPass, comparePass);

  if (!isActive) {
    throw new AppError("Usuário não está ativo.", 400);
  }

  if (!hashCompare) {
    throw new AppError("Email ou senha inválidos.", 403);
  }

  const secretKeyToken = process.env.SECRET_KEY || "SECRETKEY";

  const token = sign({ id }, secretKeyToken, {
    expiresIn: "24h",
    subject: email,
  });

  return { token };
};

export default loginUserService;
