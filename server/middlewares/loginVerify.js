import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "") || req.headers.token;

    if (!token) {
      return res.status(401).send("You must be logged in");
    }

    const data = jwt.verify(token, process.env.JWT_KEY);
    
    const user=await userModel.findById(data._id).select("-password")

    if(!user){
        return res.json({success:false,message:"user not found"})
    }

    req.user=user

    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};
