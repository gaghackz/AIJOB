import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function sessionValidator(
  next: NextFunction,
  res: Response,
  req: Request
) {
  const headers = req.headers;
  const accessToken: any = headers.accessToken;
  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const user: any = jwt.verify(
    accessToken,
    process.env.JWT_SECRET_ACCESS!,
    (err: any) => {
      if (err) {
        return res.status(406).json({
          message: "Unauthorized",
        });
      } else {
        req.body.email = user.email;
        next();
      }
    }
  );
}
