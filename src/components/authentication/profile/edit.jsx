// components/authentication/profile/edit.jsx
"use client";

// library imports
import React, { useState } from "react";
import { MdPerson, MdChildCare, MdEdit, MdArrowBack } from "react-icons/md";
import Image from "next/image";

// logic
import { updateProfile, deleteProfile } from "../../../lib/profileApi";
// components
import Notification from "../../notification/notification";

export default function ProfileEdit({
  profile,
  onCancel,
  onUpdateComplete,
  onDeleteComplete,
}) {
  const [notification, setNotification] = useState(null);
  const [isKidsAccount, setIsKidsAccount] = useState(profile.is_kid || false);
  const [language, setLanguage] = useState(profile.language || "");
  const [maturity_level, setMaturity] = useState(profile.maturity_level || "");
  const [profile_name, setProfileName] = useState(profile.profile_name || "");
  const [profile_image, setProfileImage] = useState(
    profile.profile_image || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile_name || !language || !maturity_level) {
      setNotification({
        type: "error",
        message: "Please fill out all fields.",
      });
      return;
    }

    const updatedProfileData = {
      id: profile.profile_id,
      profileName: profile_name,
      profileImage: profile_image,
      is_kid: isKidsAccount,
      language: language,
      maturity: maturity_level,
    };

    try {
      await updateProfile(updatedProfileData);
      setNotification({
        type: "success",
        message: "Profile updated successfully",
      });
      onUpdateComplete();
      onCancel();
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleEditImage = () => {
    const list = [1, 2, 3, 4, 5, 6].map((n) => `/demo/avatars/a${n}.png`);
    const at = list.indexOf(profile_image);
    setProfileImage(list[(at + 1) % list.length]);
  };

  const handleBack = () => {
    onCancel();
  };

  const deleteProfileData = {
    id: profile.profile_id,
    profileName: profile_name,
    profileImage: profile_image,
    is_kid: isKidsAccount,
    language: language,
    maturity: maturity_level,
  };

  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this profile? This action cannot be undone."
      )
    ) {
      try {
        await deleteProfile(deleteProfileData); // Call the deleteProfile function
        setNotification({
          type: "success",
          message: "Profile deleted successfully",
        });
        onDeleteComplete(); // Call the callback to update the profile list
        handleBack();
      } catch (error) {
        setNotification({
          type: "error",
          message: "Failed to delete profile. Please try again.",
        });
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-screen overflow-hidden px-4 py-8">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <button
        type="button"
        className="absolute top-4 left-4 md:top-8 md:left-8 bg-zinc-900 text-white p-3 text-xl rounded-full hover:bg-zinc-800"
        onClick={handleBack}>
        <MdArrowBack />
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center max-w-[90%] w-full md:max-w-lg">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-white">
          Edit your Profile?
        </div>
        <div className="text-xs sm:text-sm lg:text-base font-light text-center text-sky-50 mt-2 sm:mt-3 lg:mt-4">
          Tailor your movie streaming experience by setting up dedicated
          profiles for each viewer
        </div>

        <div className="mt-8 flex flex-col justify-center w-full mb-6 relative">
          <div className="flex items-center gap-4 py-3 rounded-xl bg-zinc-900 px-4 h-14">
            <MdPerson className="text-white text-3xl" />
            <input
              type="text"
              className="flex-auto bg-transparent text-white placeholder-dark-grey focus:outline-none"
              placeholder="Profile Name"
              value={profile_name}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6 w-full">
          <div className="relative w-1/3 rounded-md bg-zinc-900 h-32 overflow-hidden">
            <Image
              src={profile_image}
              alt="Profile Image"
              layout="fill"
              objectFit="cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
              onClick={handleEditImage}>
              <MdEdit className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col w-2/3 gap-4">
            <div className="flex items-center gap-4 w-full rounded-xl bg-zinc-900 py-3 px-4 h-14">
              <select
                className="flex-auto bg-zinc-900 text-white placeholder-dark-grey focus:outline-none"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Language">
                <option value="" disabled>
                  Language
                </option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            <div className="flex items-center gap-4 w-full rounded-xl bg-zinc-900 py-3 px-4 h-14">
              <select
                className="flex-auto bg-zinc-900 text-white placeholder-dark-grey focus:outline-none"
                value={maturity_level}
                onChange={(e) => setMaturity(e.target.value)}
                aria-label="Select Maturity">
                <option value="" disabled>
                  Maturity
                </option>
                <option value="All Ages">All Maturity Ages</option>
                <option value="Teens">Teens</option>
                <option value="Mature">Mature</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-6 w-full">
          <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-zinc-900 h-14 w-full">
            <div className="flex-auto text-white">Kids Account?</div>
            <input
              type="checkbox"
              className="hidden"
              id="kids-account-checkbox"
              checked={isKidsAccount}
              onChange={(e) => setIsKidsAccount(e.target.checked)}
            />
            <label
              htmlFor="kids-account-checkbox"
              className="flex items-center cursor-pointer">
              <div className="relative">
                <div className="block bg-zinc-800 w-10 h-6 rounded-full"></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                    isKidsAccount
                      ? "transform translate-x-full bg-[#00FF99]"
                      : ""
                  }`}></div>
              </div>
              <MdChildCare
                className={`ml-3 text-2xl ${
                  isKidsAccount ? "text-[#00FF99]" : "text-white"
                }`}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <button
            type="submit"
            className="px-8 py-4 bg-[#00FF99] text-base font-bold text-black rounded-xl w-full mr-2 focus:outline-none focus:ring focus:ring-emerald-200">
            Save Changes
          </button>

          <button
            type="button"
            className="px-8 py-4 bg-zinc-900 text-base font-bold text-white rounded-xl w-full focus:outline-none focus:ring focus:ring-emerald-200 hover:bg-zinc-800"
            onClick={handleDeleteProfile}>
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
}
