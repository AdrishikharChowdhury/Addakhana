import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name: {type:String,required:true,unique:true},
    email: {type:String,required:true},
    password: {type:String,required:true,minLength:8},
    image:{type:String,default:""},
    bio:{type:String,default:"Hey i'm using Addakhana"}
},{timeStamps:true})

const userModel=mongoose.model("userModel",userSchema)

export default userModel