import React, { useContext } from 'react'
import defaultPic from "../assets/default-avatar.webp";
import samplepic2 from '../assets/woat1.webp'
import { AuthContext } from '../context/AuthContext';
import formatToIST from '../lib/utils'

const RightChatImage = ({image,createdAt}) => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="flex flex-row-reverse items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <img src={authUser.image || defaultPic} className="size-10 rounded-full" alt="" />
        <p className="font-light text-sm">{formatToIST(createdAt)}</p>
      </div>
      <img src={image} className="w-1/2 object-cover rounded-l-2xl rounded-tr-2xl bg-purple-950 border-2 border-purple-700 mb-10" />
    </div>
  )
}

export default RightChatImage
