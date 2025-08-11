import { Request, Response } from "express";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/uservalid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    const checkPassword = await bcrypt.compare(
      check.data.password,
      user.password
    );

    if (!checkPassword) {
      res.json({
        success: false,
        message: "Password is incorrect",
      });
      return;
    }

    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_ACCESS!,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_REFRESH!,
      {
        expiresIn: "15d",
      }
    );

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken: accessToken,
    });
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(check.data.password, salt);
    const user = await prisma.user.create({
      data: {
        email: check.data.email,
        password: hashedPassword,
      },
    });
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_ACCESS!,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_REFRESH!,
      {
        expiresIn: "15d",
      }
    );

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "User registered successfully",
      accessToken: accessToken,
    });
    return;
  } catch (error) {
    res.json({
      success: "false",
      message: error,
    });
    return;
  }
}

export async function refreshToken(req: Request, res: Response) {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;
    const body = req.body;

    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH!,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(406).json({ message: "Unauthorized" });
        } else {
          const accessToken = jwt.sign(
            {
              email: body.email,
            },
            process.env.JWT_SECRET_ACCESS!,
            {
              expiresIn: "30m",
            }
          );
          return res.json({ accessToken });
        }
      }
    );
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
}
