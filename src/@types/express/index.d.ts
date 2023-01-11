declare global {
  namespace Express {
    interface Request {
      validatedBody: object;
    }
  }
}

export {};
