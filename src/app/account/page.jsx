"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiHome, FiMail, FiLock, FiUsers, FiTrash2 } from "react-icons/fi";
import Image from "next/image"; 

import Header from "../../components/content/common/Header";
import Footer from "../../components/footer/footer";
import Notification from "../../components/notification/notification";
import ProfileEdit from "../../components/authentication/profile/edit";
import LoadingScreen from "../../components/loading/loadingScreen"; 
import Alert from "../../components/alert/alert"; 

import { createClient } from "../../utils/supabase/client";
import { updateProfile, getProfiles, deleteProfile, deleteAccount } from "../../lib/profileApi";


export default function AccountManagement() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newpassword , setNewpassword ] = useState("");
  const [confirmpassword , setConfirmpassword ] = useState("");
  const [notification, setNotification] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); 
  const [showAlert, setShowAlert] = useState(false); 
  const [confirmAction, setConfirmAction] = useState(null); 


  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchUserData();
    fetchProfiles();
  }, []);

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setDisplayName(user.user_metadata.displayName || "");
      setEmail(user.email);
    } else {
      router.push("/sign-in");
    }
  };

  const fetchProfiles = async () => {
    try {
      const fetchedProfiles = await getProfiles();
      setProfiles(fetchedProfiles);
    } catch (error) {
      setNotification({ type: "error", message: "Failed to fetch profiles" });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ displayName });
      setNotification({
        type: "success",
        message: "Profile updated successfully",
      });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to update profile" });
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      setEmail(newEmail);
      setNotification({
        type: "success",
        message: "Email changed successfully",
      });
      setNewEmail("");
    } catch (error) {
      setNotification({ type: "error", message: "Failed to change email" });
    }
  };

  const handleChangepassword  = async (e) => {
    e.preventDefault();
    if (newpassword  !== confirmpassword ) {
      setNotification({ type: "error", message: "password's do not match" });
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password : newpassword,
      });
      if (error) throw error;
      setNotification({
        type: "success",
        message: "password changed successfully",
      });
      setNewpassword ("");
      setConfirmpassword ("");
    } catch (error) {
      setNotification({ type: "error", message: "Failed to change password" });
    }
  };

  const handleDeleteAccount = () => {
    setConfirmAction(() => async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const userId = user.id;
          await deleteAccount(userId);
          router.push("/sign-in");
        } else {
          throw new Error("No user found");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        setNotification({ type: "error", message: "Failed to delete account" });
      }
    });
    setShowAlert(true);
  };

  const handleDeleteProfile = async (profileId) => {
    if (profiles.length === 1) {
      setNotification({ type: "error", message: "You cannot delete the last profile." });
      return; 
    }

    const currentProfile = JSON.parse(localStorage.getItem("selectedProfile"));
    if (currentProfile && (currentProfile.profile_id || currentProfile.id) === profileId) {
      setNotification({ type: "error", message: "You cannot delete the currently active profile." });
      return; 
    }

    setConfirmAction(() => async () => {
      try {
        await deleteProfile({ id: profileId });
        setNotification({
          type: "success",
          message: "Profile deleted successfully",
        });
        fetchProfiles();
      } catch (error) {
        setNotification({ type: "error", message: "Failed to delete profile" });
      }
    });
    setShowAlert(true); 
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  if (!user) {
    return <LoadingScreen />; 
  }

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />
      <main className="flex-grow container mx-auto flex flex-col md:flex-row px-4 py-8">
        <nav className="w-full md:w-1/4 rounded-xl mb-8 md:mb-0 md:sticky md:top-0">
          <h2 className="text-2xl font-bold mb-8 text-white">
            Account Settings
          </h2>
          <ul className="space-y-6">
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center space-x-4 w-full text-lg ${
                  activeTab === "profile" ? "text-[#00FF99]" : "text-white"
                } hover:text-[#00FF99] transition-colors duration-300`}>
                <FiHome className="text-2xl" />
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("email")}
                className={`flex items-center space-x-4 w-full text-lg ${
                  activeTab === "email" ? "text-[#00FF99]" : "text-white"
                } hover:text-[#00FF99] transition-colors duration-300`}>
                <FiMail className="text-2xl" />
                <span>Email</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("security ")}
                className={`flex items-center space-x-4 w-full text-lg ${
                  activeTab === "security " ? "text-[#00FF99]" : "text-white"
                } hover:text-[#00FF99] transition-colors duration-300`}>
                <FiLock className="text-2xl" />
                <span>Security </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profiles")}
                className={`flex items-center space-x-4 w-full text-lg ${
                  activeTab === "profiles" ? "text-[#00FF99]" : "text-white"
                } hover:text-[#00FF99] transition-colors duration-300`}>
                <FiUsers className="text-2xl" />
                <span>Manage Profiles</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("delete")}
                className="flex items-center space-x-4 w-full text-lg text-white hover:text-[#00FF99] transition-colors duration-300">
                <FiTrash2 className="text-2xl" />
                <span>Delete Account</span>
              </button>
            </li>
          </ul>
        </nav>

        <section className="w-full md:w-3/4 md:pl-8 mt-10">
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={handleCloseNotification}
            />
          )}

          {activeTab === "profile" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label htmlFor="displayName" className="block mb-2">
                    Account Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    disabled
                    className="w-full max-w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="w-full max-w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px] cursor-not-allowed"
                  />
                </div>
              </form>
            </div>
          )}

          {activeTab === "email" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Email Settings</h2>
              <form onSubmit={handleChangeEmail} className="space-y-4">
                <div>
                  <label htmlFor="newEmail" className="block mb-2">
                    New Email
                  </label>
                  <input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full max-w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00FF99] text-black font-normal rounded-[10px]">
                  Change Email
                </button>
              </form>
            </div>
          )}

          {activeTab === "security " && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Password Settings</h2>
              <form onSubmit={handleChangepassword} className="space-y-4">
                <div>
                  <label htmlFor="newpassword" className="block mb-2">
                    New password
                  </label>
                  <input
                    id="newpassword"
                    type="password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                    className="w-full max-w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmpassword" className="block mb-2">
                    Confirm password
                  </label>
                  <input
                    id="confirmpassword"
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    className="w-full max-w-[328px] h-[50px] rounded-[10px] px-[5px] bg-zinc-900 text-[16px] text-white outline-none pl-[14px]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00FF99] text-black font-normal rounded-[10px]">
                  Submit
                </button>
              </form>
            </div>
          )}

          {activeTab === "profiles" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Manage Profiles</h2>
              {profiles.map((profile) => {
                const currentProfile = JSON.parse(
                  localStorage.getItem("selectedProfile")
                );
                return (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={profile.profile_image}
                        alt={profile.profile_name}
                        width={40}
                        height={40}
                        className="w-[27px] md:w-[31px] h-[27px] md:h-[31px] rounded-full object-cover"
                      />
                      <h3 className="text-xl text-white font-medium">
                        {profile.profile_name}
                      </h3>
                    </div>
                    <div>
                
                      {currentProfile && currentProfile.id !== profile.id && (
                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="ml-2 px-4 py-2 bg-red-500 text-white font-normal rounded-[10px]">
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
        
            </div>
          )}

          {activeTab === "delete" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Delete Account
              </h2>
              <p className="mb-4">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white font-normal rounded-[10px]">
                Delete Account
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
      {showAlert && (
        <Alert
          message="Are you sure you want to delete your account?"
          onConfirm={() => {
            if (confirmAction) {
              confirmAction();
            }
            setShowAlert(false);
          }}
          onCancel={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
