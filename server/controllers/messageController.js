import dbgr from "debug";
const log = dbgr("development:messageController");
import userModel from "../models/user-model.js";
import messageModel from '../models/message-model.js'
import cloudinary from '../lib/cloudinary.js'
import { io,userSocketMap } from "../server.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const { _id } = req.user;
    const allUsers = await userModel.find({ _id: { $ne: _id } }).select('-password');
    const unseenMessages = {}
    const promises = allUsers.map(async (user) => {
      const messages = await messageModel.find({ senderId: user._id, recieverId: _id, seen: false })
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length
      }
    })
    await Promise.all(promises)
    res.json({ success: true, users: allUsers, unseenMessages })
  } catch (error) {
    log(error.message);
    res.json({ success: false, message: error.message })
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params
    const { _id } = req.user
    const messages = await messageModel.find({
      $or: [{ senderId: _id, recieverId: selectedUserId },
      { senderId: selectedUserId, recieverId: _id }]
    })
    await messageModel.updateMany({ senderId: selectedUserId, recieverId: _id }, { seen: true })
    res.json(({ success: true, messages }))
  } catch (error) {
    log(error.message)

  }
}

export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params
    await messageModel.findByIdAndUpdate(id, { seen: true })
    res.json({ success: true })
  } catch (error) {
    log(error.message)
    res.json({ success: false, message: error.message })
  }
}

export const sendMessage=async (req,res) => {
  try {
    const {text,image}=req.body
    const {id}=req.params
    const {_id}=req.user
    
    let imageUrl;
    if(image){
      const uploadResponse=await cloudinary.uploader.upload(image,{
        folder:`${id}and${_id}`,
        resource_type: "image",
      })
      imageUrl=uploadResponse.secure_url
    }

    const newMessage=await messageModel.create({
      senderId:_id,
      recieverId:id,
      text,
      image:imageUrl
    })

    const recieverSocketId=userSocketMap[id]

    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage",newMessage)
    }

    res.json({success:true, newMessage})
  } catch (error) {
    log(error.message)
    res.json({ success: false, message: error.message })
  }
}