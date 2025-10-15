import { useState, useEffect } from "react";

interface UserData {
  hasCompletedOnboarding: boolean;
  hasSetOgadsUsername: boolean;
  ogadsUsername: string;
}

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>({
    hasCompletedOnboarding: false,
    hasSetOgadsUsername: false,
    ogadsUsername: ""
  });

  // Check localStorage for user data on mount
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const setOgadsUsername = (username: string) => {
    const newUserData = {
      ...userData,
      hasSetOgadsUsername: true,
      ogadsUsername: username
    };
    setUserData(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
  };

  const completeOnboarding = () => {
    const newUserData = {
      ...userData,
      hasCompletedOnboarding: true
    };
    setUserData(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
  };

  const resetUserData = () => {
    const newUserData = {
      hasCompletedOnboarding: false,
      hasSetOgadsUsername: false,
      ogadsUsername: ""
    };
    setUserData(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
  };

  return {
    userData,
    setOgadsUsername,
    completeOnboarding,
    resetUserData
  };
};