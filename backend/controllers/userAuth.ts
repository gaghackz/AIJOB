import { Request, Response } from "express";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/uservalid";
import prisma from "../db";

export async function UserLogin(req: Request, res: Response) {
  try {
    const body = req.body;
    const check = userLoginValidator.safeParse(body);
    if (!check.success) {
      res.status(400).json({
        success: false,
        message: check.error,
      });
      return;
    }
    const user = await prisma.user.findFirst({
      where: {
        email: check.data.email,
      },
    });
    if (!user) {
      res.json({
        success: false,
        message: "User not found",
      });
      return;
    }
    return;
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    return;
  }
}

export async function UserRegister(req: Request, res: Response) {
  try {
    const body = req.body;
    const check = userRegisterValidator.safeParse(body);

    if (!check.success) {
      res.json({
        success: false,
        message: check.error,
      });
      return;
    }

    const checkUser = await prisma.user.findFirst({
      where: {
        email: check.data.email,
      },
    });

    if (checkUser) {
      res.json({
        success: false,
        message: "User already exists",
      });
      return;
    }
    const user = await prisma.user.create({
      data: {
        email: check.data.email,
      },
    });
    return
    
}catch(err){
  res.status(400).json({
    success:false,
    message:err
  })
  return
}
}
