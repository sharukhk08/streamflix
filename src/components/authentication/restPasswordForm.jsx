import React from "react";
import { resetPasswordAction } from "../../api/authentication/resetPassword";

export default function ResetPasswordForm() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

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
        Reset Password
      </h1>
      <p className="text-white text-center font-semibold leading-snug text-xl -mt-2">
        Enter your new password below
      </p>

      <form className="flex flex-col gap-[10px] my-[12px]">
        <input
          className="w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px]"
          type="password"
          name="password"
          placeholder="New password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px]"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          formAction={resetPasswordAction}
          className="w-[328px] h-[55px] text-black bg-[#00FF99] font-bold rounded-[10px] mt-3 hover:bg-[#00e68a] active:bg-[#00cc7a] disabled:bg-[#4d4d4d] disabled:text-[#999999]"
          disabled={!password || !confirmPassword || password !== confirmPassword}
        >
          Reset password
        </button>
      </form>
    </div>
  );
}
