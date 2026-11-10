// Profile + account calls. In demo mode they use the browser's localStorage (no database);
// otherwise they call the real server actions.
import { getProfiles as srvGet } from "../api/authentication/profile/getprofiles";
import { createProfile as srvCreate } from "../api/authentication/profile/createprofile";
import { updateProfile as srvUpdate } from "../api/authentication/profile/updateprofile";
import { deleteProfile as srvDelete } from "../api/authentication/profile/deleteprofile";
import { deleteAccount as srvDeleteAccount } from "../api/authentication/deleteAccount";

const DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const KEY = "demoProfiles";
const seed = [
  { profile_id: "demo-profile-1", id: "demo-profile-1", profile_name: "Demo User",
    profile_image: "/demo/avatar.png", is_kid: false, language: "en", maturity_level: "all" },
];

const read = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(v) && v.length) return v;
  } catch {}
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
};
const write = (list) => localStorage.setItem(KEY, JSON.stringify(list));

export const getProfiles = DEMO ? async () => read() : srvGet;

export const createProfile = DEMO
  ? async (d) => {
      const id = `demo-profile-${Date.now()}`;
      const p = {
        profile_id: id, id,
        profile_name: d.profileName || "New profile",
        profile_image: d.profileImage || "/demo/avatar.png",
        is_kid: !!d.isKidsAccount, language: d.language || "en", maturity_level: d.maturity || "all",
      };
      write([...read(), p]);
      return p;
    }
  : srvCreate;

export const updateProfile = DEMO
  ? async (d) => {
      if (!d || !d.id) return null;
      const list = read().map((p) =>
        p.profile_id === d.id
          ? { ...p, profile_name: d.profileName ?? p.profile_name, profile_image: d.profileImage ?? p.profile_image,
              is_kid: d.is_kid ?? p.is_kid, language: d.language ?? p.language, maturity_level: d.maturity ?? p.maturity_level }
          : p
      );
      write(list);
      try {
        const sel = JSON.parse(localStorage.getItem("selectedProfile"));
        if (sel && sel.profile_id === d.id) localStorage.setItem("selectedProfile", JSON.stringify(list.find((p) => p.profile_id === d.id)));
      } catch {}
      return null;
    }
  : srvUpdate;

export const deleteProfile = DEMO
  ? async (d) => {
      const id = d && d.id;
      const list = read().filter((p) => p.profile_id !== id);
      write(list.length ? list : seed);
    }
  : srvDelete;

export const deleteAccount = DEMO
  ? async () => {
      localStorage.removeItem("demoProfiles");
      localStorage.removeItem("selectedProfile");
    }
  : srvDeleteAccount;
