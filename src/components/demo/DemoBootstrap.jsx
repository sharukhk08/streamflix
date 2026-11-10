"use client";
import { useState } from "react";

// Demo only: preselect a profile during the first client render, before any page checks for it,
// so every page works when opened directly.
export default function DemoBootstrap() {
  useState(() => {
    if (typeof window === "undefined") return null;
    if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") return null;
    try {
      if (!localStorage.getItem("selectedProfile")) {
        localStorage.setItem(
          "selectedProfile",
          JSON.stringify({
            profile_id: "demo-profile-1",
            id: "demo-profile-1",
            profile_name: "Demo User",
            profile_image: "/demo/avatar.png",
          })
        );
      }
    } catch {}
    return null;
  });
  return null;
}
