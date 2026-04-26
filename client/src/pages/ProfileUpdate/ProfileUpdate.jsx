import React, { useState, useContext } from "react";
import Background from "../../components/Background";
import defaultPic from "../../assets/default-avatar.webp";
import logo from "../../assets/logo.png";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfileUpdate = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [image, setimage] = useState(false);
  const [name, setname] = useState(authUser.name);
  const [bio, setbio] = useState(authUser.bio);

  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      await updateProfile({ name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ image: base64Image, name, bio });
      navigate("/")
    };
  };
  return (
    <Background>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="p-10 bg-zinc-900 w-1/2 flex items-center justify-between">
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="flex flex-col gap-6 w-1/2 text-lg"
          >
            <h1 className="text-2xl font-extrabold">Profile Details</h1>
            <Link to="/chat" className="absolute z-15 left-100 top-30">
              <X />
            </Link>
            <label
              htmlFor="image"
              className="w-full flex flex-col items-center gap-2"
            >
              <img
                src={image ? URL.createObjectURL(image) : defaultPic}
                className="size-40 rounded-full object-cover"
                alt=""
              />
              <input
                type="file"
                onChange={(e) => {
                  setimage(e.target.files[0]);
                }}
                name="image"
                className="ml-20"
                id="image"
              />
            </label>
            <label htmlFor="name" className="flex flex-col gap-2">
              <p className="text-xl font-bold">Name:</p>
              <input
                type="text"
                name="name"
                className="p-4 bg-zinc-800 rounded-2xl"
                placeholder="Enter your name"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </label>
            <label htmlFor="bio" className="flex flex-col gap-2">
              <p className="text-xl font-bold">Bio:</p>
              <textarea
                name="bio"
                className="resize-none p-5 w-full h-40 bg-zinc-800 rounded-2xl outline-none"
                id="bio"
                placeholder={`Example: "Hey I'm using Addakhana"`}
                value={bio}
                onChange={(e) => setbio(e.target.value)}
              ></textarea>
            </label>
            <button
              type="submit"
              className="self-center h-16 w-28 flex justify-center items-center rounded-2xl bg-purple-800 shadow-2xl shadow-purple-900 cursor-pointer font-bold text-xl"
            >
              Save
            </button>
          </form>
          <div className="size-1/3 flex flex-col items-center justify-center gap-8">
            <img
              className="object-cover rounded-4xl"
              src={authUser?.image || defaultPic}
              alt=""
            />
            <p className="font-extrabold text-4xl w-full text-center">
              {authUser.name}
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default ProfileUpdate;
