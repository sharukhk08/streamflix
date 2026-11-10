// components/authentication/signUpForm.jsx
"use client";
//library
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsExclamationCircle } from "react-icons/bs";

//logic
import { signup } from "../../api/authentication/signup";

//components
import Notification from "../notification/notification";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [notification, setNotification] = useState(null); 
  const [inputError, setInputError] = useState(false); // New state for input error

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      displayName,
    };

    if (!acceptPolicy) {
      setNotification({
        type: "error",
        message: "You must accept the communication policies.",
      });
      return;
    }

    try {
      await signup(formData);
      setEmail("");
      setPassword(""); // Clear password on successful submission
      setDisplayName("");
      setAcceptPolicy(false);
      setInputError(false); // Reset input error on successful submission
      setNotification({
        type: "success",
        message: "Registration successful!",
      });
    } catch (error) {
      setInputError(true); // Set input error on failure
      setNotification({ type: "error", message: error.message });
    }
  };

  // New effect to clear notification after a few seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      hide: true,
    }));
    setTimeout(() => setNotification(null), 500);
  };

  return (
    <div className="w-full lg:w-full flex flex-col items-center gap-[10px]">
      <h1
        className="text-[36px] font-extrabold px-8 relative"
        style={{
          background:
            "linear-gradient(90deg, rgba(86, 72, 251, 1) 0%, rgba(0, 255, 153, 1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
        Welcome!
      </h1>
      <p className="text-white font-semibold leading-snug text-xl -mt-2">
        Join the Streaming Paradise!
      </p>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={handleCloseNotification}
          className={notification.hide ? "hide" : ""}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[10px] my-[12px]">
        <input
          className={`w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px] ${inputError ? 'border-2 border-red-500' : ''}`} // Change border color on error
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (inputError) {
              setInputError(false); // Reset input error on change
              setPassword(""); // Clear password field
            }
          }}
        />
        <input
          className={`w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px] ${inputError ? 'border-2 border-red-500' : ''}`} // Change border color on error
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (inputError) {
              setInputError(false); // Reset input error on change
              setEmail(""); // Clear email field
            }
          }}
        />
        <input
          className={`w-full h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px] ${inputError ? 'border-2 border-red-500' : ''}`} // Change border color on error
          type="text"
          placeholder="Full name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <div className="flex items-center gap-[17px] w-[328px] h-[46px] px-1">
          <span>
            <BsExclamationCircle className="text-xl text-[#5A5A5A]" />
          </span>
          <label htmlFor="terms" className="text-[#5A5A5A] text-base">
            By signing up, you agree to StreamFlix’s <br />
            <span className="text-[#757575] border-b">
              <Link href="/terms-of-service">Terms of Service</Link>
            </span>{" "}
            and{" "}
            <span className="text-[#757575] border-b">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </span>
          </label>
        </div>

        <div className="flex items-center gap-[17px] w-[328px] h-[43px] px-1">
          <input
            className="appearance-none w-[15px] h-[15px] rounded-full border-2 border-[#5A5A5A] checked:bg-[#00FF99] checked:border-[#00FF99] transition-all duration-200 cursor-pointer"
            type="checkbox"
            id="policy"
            checked={acceptPolicy}
            onChange={(e) => setAcceptPolicy(e.target.checked)}
          />
          <label htmlFor="policy" className="text-[#5A5A5A] text-base cursor-pointer">
            I accept the communication policies
          </label>
        </div>

        <button
          type="submit"
          className="w-[328px] h-[55px] text-black bg-[#00FF99] font-bold rounded-[10px] mt-3 hover:bg-[#00e68a] active:bg-[#00cc7a] disabled:bg-[#4d4d4d] disabled:text-[#999999]"
          disabled={!email || !password || !acceptPolicy}>
          Sign up
        </button>
      </form>

     {/*  <div className="flex items-center gap-[10px] my-[10px]">
        <div className="w-[84px] border border-[#474747]"></div>
        <p className="text-base text-[#999999] font-normal">or continue with</p>
        <div className="w-[84px] border border-[#474747]"></div>
      </div>

      <div className="flex items-center gap-[47px]">
        <Image
          src="/authentication/google.png"
          alt="Google"
          width={40}
          height={40}
        />
        <Image
          src="/authentication/facebook.png"
          alt="Facebook"
          width={40}
          height={40}
        />
        <Image
          src="/authentication/apple.png"
          alt="Apple"
          width={55}
          height={55}
        />
      </div> */}

      <p className="text-base text-[#5A5A5A] font-medium my-[10px]">
        Already have an account?
        <Link href="/sign-in" className="text-[#05955C]">
          {" "}
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;