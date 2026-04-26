import React, { createContext, useState,useEffect } from "react";
import axios from 'axios'
import dbgr from 'debug'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'

const log=dbgr("development:AuthContext")

const backendUrl = import.meta.env.VITE_BACKEND_URL

axios.defaults.baseURL = backendUrl

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const checkAuth=async () => {
    try {
      const savedToken = localStorage.getItem("token")
      if (savedToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`
        console.log("checkAuth: Token found, setting header")
      }
      const {data}=await axios.get("/api/auth/check")
      console.log("checkAuth response:", data)
      if(data.success){
        console.log("checkAuth: Setting user", data.user)
        setauthUser(data.user)
        connectSocket(data.user)
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Auth check failed"
      console.log("checkAuth error:", error)
      localStorage.removeItem("token")
      setauthUser(null)
      log(`Auth check failed: ${msg}`)
    }
  }

  const login=async (state,credentials) => {
    try {
      const {data}=await axios.post(`/api/auth/${state}`,credentials)
      if(data.success){
        setauthUser(data.userData)
        connectSocket(data.userData)
        axios.defaults.headers.common["Authorization"]=`Bearer ${data.token}`
        settoken(data.token)
        localStorage.setItem("token",data.token)
        toast.success(data.message)
      }
      else{
        toast.error(data.message || "Login failed")
        log(`Login failed: ${data.message}`)
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Login failed"
      toast.error(msg)
      log(`Login error: ${msg}`, error)
    }
  }

  const logout=async () => {
    try {
      localStorage.removeItem("token")
      settoken(null)
      setauthUser(null)
      setonlineUsers([])
      axios.defaults.headers.common["Authorization"]=null
      toast.success("Successfully Logged Out")
      socket?.disconnect()
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
    const savedToken = localStorage.getItem("token")
    if(savedToken){
      axios.defaults.headers.common["Authorization"]=`Bearer ${savedToken}`
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
