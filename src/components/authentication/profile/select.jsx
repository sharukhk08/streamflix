"use client";

// library imports
import { go } from "../../../lib/nav";
import React, { useState, useEffect, useCallback } from "react";
import { MdModeEdit, MdAdd } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";

// logic
import { getProfiles } from "../../../lib/profileApi";

// components
import ProfileCreate from "./create";
import PersonaliseProfile from "./personalise";
import ProfileEdit from "./edit";
import LoadingScreen from "../../loading/loadingScreen";


export default function SelectProfile() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileCreate, setShowProfileCreate] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [step, setStep] = useState(3);
  const [isProcessComplete, setIsProcessComplete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchProfiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedProfiles = await getProfiles();
      setProfiles([
        ...fetchedProfiles,
        { name: "Add Profile", isPlaceholder: true },
      ]);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
      setError("Failed to fetch profiles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    if (step === 5) {
      setShowProfileCreate(false);
      setStep(3);
      setIsProcessComplete(true);
      fetchProfiles();
    }
  }, [step, fetchProfiles]);

  const handleProfileClick = (index) => {
    if (profiles[index].isPlaceholder) {
      setShowProfileCreate(true);
      setStep(3);
    } else if (editMode) {
      setSelectedProfile(index);
      setShowProfileEdit(true);
    } else {
      localStorage.removeItem("selectedProfile");

      setSelectedProfile(index);
      localStorage.setItem("selectedProfile", JSON.stringify(profiles[index]));

      go(router, "/browse");
    }
  };

  const handleStepChange = (nextStep) => {
    if (nextStep === null) {
      setShowProfileCreate(false);
      setStep(3);
    } else {
      setStep(nextStep);
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleUpdateComplete = () => {
    fetchProfiles(); // Fetch updated profiles
  };

  const handleDeleteComplete = () => {
    fetchProfiles(); // Fetch updated profiles after deletion
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {showProfileCreate ? (
        <>
          {step === 3 && (
            <ProfileCreate
              nextStep={() => handleStepChange(4)}
              currentStep={step}
              goBack={() => handleStepChange(null)}
            />
          )}
          {step === 4 && (
            <PersonaliseProfile onComplete={() => handleStepChange(5)} />
          )}
        </>
      ) : showProfileEdit ? (
        <ProfileEdit
          profile={profiles[selectedProfile]}
          onCancel={() => setShowProfileEdit(false)}
          onUpdateComplete={handleUpdateComplete}
          onDeleteComplete={handleDeleteComplete} // Pass the delete complete callback
        />
      ) : (
        <div className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden px-4 sm:px-6 lg:px-8 shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
          <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg lg:max-w-xl">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-white">
              Who is watching?
            </div>
            <div className="text-xs sm:text-sm lg:text-base font-light text-center text-sky-50 mt-2 sm:mt-3 lg:mt-4">
              Tailor your movie streaming experience by setting up dedicated
              profiles for each viewer
            </div>
            <div className="mt-8 sm:mt-10 lg:mt-12 w-full flex justify-center">
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                {profiles.map((profile, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out ${
                      editMode && profile.isPlaceholder
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                    onClick={() => handleProfileClick(index)}>
                    <div
                      className={`relative mt-3 sm:mt-4 lg:mt-5 h-24 sm:h-32 lg:h-36 w-24 sm:w-32 lg:w-36 rounded-full border-solid ${
                        selectedProfile === index
                          ? "border-transparent"
                          : "border-transparent"
                      } border-[3px] transition-all duration-300 hover:border-[#00FF99]`}>
                      {editMode && !profile.isPlaceholder && (
                        <div className="absolute top-1 right-1 bg-zinc-900 p-2 rounded-full z-10 border-[2px] border-[#00FF99]">
                          <MdModeEdit className="text-white text-xl" />
                        </div>
                      )}
                      {profile.isPlaceholder ? (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full">
                          <MdAdd className="text-[#00FF99] text-8xl" />
                        </div>
                      ) : (
                        <Image
                          src={profile.profile_image}
                          alt={profile.profile_name || "Profile Image"}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      )}
                    </div>
                    <div className="mt-2 text-base font-normal sm:text-lg text-white text-center">
                      {profile.profile_name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col items-center">
              <button
                className={`flex items-center bg-zinc-900 justify-center rounded-2xl p-3 w-60 h-12 border-[2px] transition-colors duration-300 hover:border-[#00FF99] ${
                  editMode ? "border-[#00FF99]" : "border-transparent"
                } hover:text-[#00FF99]`}
                aria-label="Toggle edit mode"
                onClick={toggleEditMode}>
                <MdModeEdit className="text-base sm:text-lg lg:text-2xl text-white mr-2 transition-colors duration-300" />
                <span className="text-white transition-colors duration-300">
                  Manage Profiles
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
