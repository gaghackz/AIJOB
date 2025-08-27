import { Request, Response } from "express";
import prisma from "../db";

export async function roleSelect(req: Request, res: Response) {
  const body = req.body;
  try {
    const role = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!role) {
      return res.json({
        success: false,
        message: "User not found, please signin or register",
      });
    }

    const add = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        role: body.role,
      },
    });
    if (!add) {
      return res.json({
        success: false,
        message: "role not added, try again :(",
      });
    }
    return res.status(200).json({
      success: true,
      message: "role assigned to User :D",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}
