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
      <div className="flex flex-col md:flex-row-reverse justify-between items-center h-screen w-full">
        {/* Banner - hidden on mobile, shown on tablet+ */}
        <img
          src={registerLoginBanner}
          className="hidden md:block h-full w-2/3 object-cover"
          alt=""
        />
        <form
          className="text-base md:text-lg flex flex-col w-full md:w-1/3 gap-3 md:gap-4 p-4 md:p-10"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <img
            src={logo}
            className="w-20 h-20 md:size-30 object-cover self-center rounded-xl md:rounded-2xl mb-2 md:mb-4"
            alt=""
          />
          <h2 className="font-extrabold text-xl md:text-3xl self-center mb-4 md:mb-6">
            Register Your Account
          </h2>
          <label htmlFor="name" className="flex flex-col gap-2 md:gap-4">
            <p className="font-semibold text-lg md:text-xl">Enter Your Username:</p>
            <input
              required
              type="text"
              name="name"
              id="name"
              className="border-2 p-3 md:p-4 rounded-xl md:rounded-2xl text-base"
              placeholder="Enter your username..."
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </label>
          <label className="flex flex-col gap-2 md:gap-4" htmlFor="email">
            <p className="font-semibold text-lg md:text-xl">Enter Your Email:</p>
            <input
              required
              className="border-2 p-3 md:p-4 rounded-xl md:rounded-2xl text-base"
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
          <label className="flex flex-col gap-2 md:gap-4" htmlFor="password">
            <p className="font-semibold text-lg md:text-xl">Enter Your Password:</p>
            <input
              required
              className="border-2 p-3 md:p-4 rounded-xl text-base"
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
            className="flex gap-2 md:gap-4 justify-center items-center"
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
            <p className="font-extralight text-xs md:text-sm">
              Agree to the terms of use and privacy policy
            </p>
          </label>
          <button
            className="self-center h-12 md:h-16 w-full md:w-30 flex justify-center items-center rounded-xl md:rounded-2xl bg-purple-800 shadow-2xl shadow-purple-900 cursor-pointer font-bold text-base md:text-lg"
            type="submit"
          >
            Sign Up
          </button>
          <div className="flex gap-2 md:gap-4 justify-center items-center">
            <p className="font-extralight text-sm md:text-base">
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
