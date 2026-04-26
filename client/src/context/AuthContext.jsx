import React, { createContext, useState,useEffect } from "react";
import axios from 'axios'
import dbgr from 'debug'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'

const log=dbgr("development:AuthContext")

const backendUrl = import.meta.env.VITE_BACKEND_URL

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const checkAuth=async () => {
    try {
      const {data}=await axios.get("/api/auth/check")
      if(data.success){
        setauthUser(data.user)
        connectSocket(data.user)
      }
    } catch (error) {
      toast.error(error.message)
      log(error.message)
    }
  }

  const login=async (state,credentials) => {
    try {
      const {data}=await axios.post(`/api/auth/${state}`,credentials)
      if(data.success){
        setauthUser(data.userData)
        connectSocket(data.userData)
        axios.defaults.headers.common["token"]=data.token
        settoken(data.token)
        localStorage.setItem("token",data.token)
        toast.success(data.message)
      }
      else{
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message)
      log(error.message)
    }
  }

  const logout=async () => {
    try {
      localStorage.removeItem("token")
      settoken(null)
      setauthUser(null)
      setonlineUsers([])
      axios.defaults.headers.common["token"]=null
      toast.success("Successfully Logged Out")
      socket.disconnect()
    } catch (error) {
      log(error.message)
    }
  }

  const updateProfile=async (body) => {
    try {
      const {data}=await axios.put("/api/auth/update",body)
      if(data.success){
        setauthUser(data.user)
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      toast.error(error.message)
      log(error.message)
    }
  }

  const connectSocket=(userData)=>{
    if(!userData || socket?.connected) return;
    const newScoket=io(backendUrl,{
      query:{
        userId: userData._id
      }
    })
    newScoket.connect()
    setsocket(newScoket)

    newScoket.on("getOnlineUsers",(userIds)=>{
      setonlineUsers(userIds)
    })
  }

  useEffect(() => {
    if(token){
      axios.defaults.headers.common["token"]=token
    }
    checkAuth()
  }, [])
  

  const [token, settoken] = useState(localStorage.getItem("token"))
  const [authUser, setauthUser] = useState(null)
  const [onlineUsers, setonlineUsers] = useState([])
  const [socket, setsocket] = useState(null)

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
