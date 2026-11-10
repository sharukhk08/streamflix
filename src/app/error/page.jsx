//error.jsx

//library

//components

"use client";
import React from "react";
import { signOut } from "../../api/authentication/signout";


const handleSignOut = async () => {
  try {
    await signOut();
    localStorage.removeItem("selectedProfile");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

export default function ErrorPage() {
  return (
    <>
      <p>Sorry, something went wrong</p>
      <button onClick={handleSignOut}>Logout</button>
    </>
  );
}
