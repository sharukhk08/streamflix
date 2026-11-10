// components/authentication/loginForm.jsx
"use client";

//library
import React, { useState, useEffect } from "react";
import Link from "next/link";

//logic
import { login } from "../../api/authentication/login";

//components
import Notification from "../notification/notification";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [inputError, setInputError] = useState(false); // New state for input error

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!email || !password) {
      setNotification({ type: "error", message: "Please complete all required fields." });
      return;
    }

    const formData = {
      email,
      password,
    };

    try {
      await login(formData);
      setEmail("");
      setPassword("");
      setInputError(false); // Reset input error on successful submission
      setNotification({ type: "success", message: "You have successfully signed in!" });
    } catch (error) {
      setInputError(true); // Set input error on failure
      setNotification({ type: "error", message: "The email or password is incorrect. Please try again." });
      // Clear email and password fields after an incorrect login attempt
      setEmail("");
      setPassword("");
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      hide: true,
    }));
    setTimeout(() => setNotification(null), 500);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="w-screen lg:w-screen flex flex-col items-center gap-[10px]">
      <h1
        className="text-[36px] font-extrabold px-8 relative"
        style={{
          background:
            "linear-gradient(90deg, rgba(86, 72, 251, 1) 0%, rgba(0, 255, 153, 1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
        Hello!
      </h1>
      <p className="text-white font-semibold leading-snug text-xl -mt-2">
        Resume your viewing journey
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
        <div className="relative w-[328px]">
          <input
            className={`w-full h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px] ${inputError ? 'border-2 border-red-500' : ''}`} // Change border color on error
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
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[#a4a4a4] leading-tight tracking-normal text-base mt-2">
              Forget Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-[328px] h-[52px] text-black bg-[#00FF99] font-bold rounded-[12px] mt-3 hover:bg-[#00e68a] active:bg-[#00cc7a] disabled:bg-[#4d4d4d] disabled:text-[#999999]"
          disabled={!email || !password}>
          Login
        </button>
      </form>

      {/* <div className="flex items-center gap-[10px] my-[10px]">
        <div className="w-[84px] border border-[#474747]"></div>
        <p className="text-pg text-[#999999] font-normal">or login with</p>
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

      <p className="text-base text-[#5A5A5A] font-normal my-[10px]">
        Don't have an account yet?
        <Link href="/sign-up" className="text-[#05955C]">
          {" "}
          Sign up!{" "}
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
