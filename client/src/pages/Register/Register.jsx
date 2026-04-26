import React, { useState, useContext } from "react";
import Background from "../../components/Background";
import { Link } from "react-router-dom";
import registerLoginBanner from "../../assets/register-login-banner.webp";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [agreed, setagreed] = useState(false);

  const { login } = useContext(AuthContext);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    login("signup",{name,email,password})
  };

  return (
    <Background>
      <div className="flex flex-row-reverse justify-between items-center h-screen">
        <img
          src={registerLoginBanner}
          className="h-full w-2/3 object-cover"
          alt=""
        />
        <form
          
          className="text-lg flex flex-col w-1/3 gap-4 p-10 self-end"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <img
            src={logo}
            className="size-30 object-cover self-center rounded-2xl mb-4"
            alt=""
          />
          <h2 className="font-extrabold text-3xl self-center mb-6">
            Register Your Account
          </h2>
          <label htmlFor="name" className="flex flex-col gap-4">
            <p className="font-semibold text-xl">Enter Your Username:</p>
            <input
              required
              type="text"
              name="name"
              id="name"
              className="border-2 p-4 rounded-2xl"
              placeholder="Enter your username..."
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </label>
          <label className="flex flex-col gap-4" htmlFor="email">
            <p className="font-semibold text-xl">Enter Your Email:</p>
            <input
              required
              className="border-2 p-4 rounded-2xl"
              placeholder="Enter your email..."
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </label>
          <label className="flex flex-col gap-4" htmlFor="password">
            <p className="font-semibold text-xl">Enter Your Password:</p>
            <input
              required
              className="border-2 p-4 rounded-xl"
              placeholder="Enter your password..."
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </label>
          <label
            className="flex gap-4 justify-center items-center h-max"
            htmlFor="check"
          >
            <input
              checked={agreed}
              onChange={(e) => setagreed(e.target.checked)}
              required
              type="checkbox"
              name="check"
              id="check"
            />
            <p className="font-extralight">
              Agree to the terms of use and privacy and policy
            </p>
          </label>
          <button
            className="self-center h-16 w-30 flex justify-center items-center rounded-2xl bg-purple-800 shadow-2xl shadow-purple-900 cursor-pointer font-bold"
            type="submit"
          >
            Sign Up
          </button>
          <div className="flex gap-4 justify-center items-center h-max">
            <p className="font-extralight">
              Already have an account ?{" "}
              <span className="pb-1 hover:border-b-2 font-normal">
                <Link to="/login">Click Here</Link>
              </span>{" "}
              to Login
            </p>
          </div>
        </form>
      </div>
    </Background>
  );
};

export default Register;
