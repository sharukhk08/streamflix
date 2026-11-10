import React from "react";
import Link from "next/link";
import { forgotPasswordAction } from "../../api/authentication/forgotPassword";

const ForgetPassword = () => {
  const [email, setEmail] = React.useState('');

  return (
    <div className="w-full lg:w-full flex flex-col items-center gap-[10px]">
      <h1
        className="text-[36px] font-extrabold px-8 relative"
        style={{
          background:
            "linear-gradient(90deg, rgba(86, 72, 251, 1) 0%, rgba(0, 255, 153, 1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Forgot Password
      </h1>
      <p className="text-white text-center font-semibold leading-snug text-xl -mt-2">
        Enter your email to reset your password
      </p>

      <form className="flex flex-col gap-[10px] my-[12px]">
        <input
          className="w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px]"
          name="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          formAction={forgotPasswordAction}
          className="w-[328px] h-[55px] text-black bg-[#00FF99] font-bold rounded-[10px] mt-3 hover:bg-[#00e68a] active:bg-[#00cc7a] disabled:bg-[#4d4d4d] disabled:text-[#999999]"
          disabled={!email}
        >
          Reset Password
        </button>
      </form>

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

export default ForgetPassword;
