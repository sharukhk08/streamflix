// Profile.jsx
"use client";

// library
import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import { redirect } from "next/navigation";

// logic
import { validateProfile } from "../../api/authentication/profile/validateprofile";

// components
import LoadingScreen from "../../components/loading/loadingScreen";
import ProfileCreate from "../../components/authentication/profile/create";
import PersonaliseProfile from "../../components/authentication/profile/personalise";
import SelectProfile from "../../components/authentication/profile/select";

function ProfileContent() {
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const exists = await validateProfile();
        setProfileExists(exists);

        if (exists) {
          setStep(2);
        }
      } catch (error) {
        console.error("Error validating profile:", error);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  // Render based on the current step
  return (
    <>
      {step === 0 && <ProfileCreate nextStep={() => setStep(1)} />}
      {step === 1 && <PersonaliseProfile onComplete={() => setStep(2)} />}
      {step === 2 && <SelectProfile />}
    </>
  );
}

export default function Profile() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProfileContent />
    </Suspense>
  );
}
