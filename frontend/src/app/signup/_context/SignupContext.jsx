"use client";

import { createContext, useContext, useState } from "react";

const SignupContext = createContext(null);

export function SignupProvider({ children }) {
  const [signupData, setSignupData] = useState({
    personal: {},
    career: {},
    skills: {},
  });

  const updatePersonal = (data) => {
    setSignupData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...data,
      },
    }));
  };

  const updateCareer = (data) => {
    setSignupData((prev) => ({
      ...prev,
      career: {
        ...prev.career,
        ...data,
      },
    }));
  };

  const updateSkills = (data) => {
    setSignupData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        ...data,
      },
    }));
  };

  const resetSignup = () => {
    setSignupData({
      personal: {},
      career: {},
      skills: {},
    });
  };



  return (
    <SignupContext.Provider
      value={{
        signupData,
        updatePersonal,
        updateCareer,
        updateSkills,
        resetSignup,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const context = useContext(SignupContext);

  if (!context) {
    throw new Error(
      "useSignup must be used inside SignupProvider"
    );
  }

  return context;
}