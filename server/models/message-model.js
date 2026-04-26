import mongoose from 'mongoose'

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required:true
    },
    text: String,
    image: String,
    seen:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

const messageModel=mongoose.model("messageModel",messageSchema)

export default messageModel