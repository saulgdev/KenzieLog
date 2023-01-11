import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup/lib/schema";
import { AppError } from "../../error/appError";

const validateSchemaMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.validatedBody = validated;
      return next();
    } catch (err) {
      throw new AppError(err.errors);
    }
  };

export default validateSchemaMiddleware;
