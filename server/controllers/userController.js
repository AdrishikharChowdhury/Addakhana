import dbgr from "debug";
import userModel from "../models/user-model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import path from "path";
import bcrypt from "bcrypt";
const log = dbgr("development:userController");
const imagePath = "/default-avatar.webp",

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        return res.json({ success: false, message: "missing details" });
      }
      const user = await userModel.findOne({ email });
      if (user) {
        return res.json({ success: false, message: "Account already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const upload = await cloudinary.uploader.upload(imagePath, {
        folder: "avatars",
        resource_type: "image",
      });

      const newUser = await userModel.create({
        name,
        email,
        password: hash,
        image: upload.secure_url,
      });

      const token = generateToken(newUser);

      res.json({
        success: true,
        userData: newUser,
        token,
        message: "Account Created",
      });
    } catch (error) {
      log(`Sign Up in Error ${error?.message || error?.error?.message || JSON.stringify(error)}`)
      res.json({ success: false, message: error.message });
      console.log(error)
    }
  } catch (error) {
    log(`Sign Up Error ${error}`);
    res.json({ success: false, message: error?.message || error?.error?.message });
    console.log(error)
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Account Does Not Exist",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Wrong Password",
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      userData: user,
      token,
      message: "Account Logged In",
    });
  } catch (error) {
    log(`Login Error ${error?.message || error}`);
    res.json({
      success: false,
      message: error?.message || "Login failed",
    });
  }
};

export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { image, bio, name } = req.body;

    const { email, _id } = req.user;

    let updatedUser;

    if (!image) {
      updatedUser = await userModel.findByIdAndUpdate(
        _id,
        { bio, name },
        { new: true },
      );
    } else {
      const upload = await cloudinary.uploader.upload(image, {
        folder: "avatars",
      });
      updatedUser = await userModel.findByIdAndUpdate(
        _id,
        { image: upload.secure_url, name, bio },
        { new: true },
      );
    }
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    log(`Update Error ${error}`);
    res.json({ success: false, message: error.message });
  }
};
