import express from "express";
import { registerUser, loginUser, adminLogin, getUserInfo } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/userinfo", getUserInfo); 

export default userRouter;
