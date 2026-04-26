import express from "express";
import {
  checkAuth,
  login,
  signUp,
  updateProfile,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/loginVerify.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.put("/update", isLoggedIn, updateProfile);
userRouter.get("/check", isLoggedIn, checkAuth);

export default userRouter;
