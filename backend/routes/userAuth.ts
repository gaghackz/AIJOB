import Router from "express";
import { UserLogin, UserRegister, refreshToken } from "../controllers/userAuth";

export const userRouter = Router();

userRouter.post("/signin", UserLogin);
userRouter.post("/signup", UserRegister);
userRouter.post("/refresh", refreshToken);
