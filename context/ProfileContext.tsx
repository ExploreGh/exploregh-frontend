import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Role = 'tourist' | 'vendor' | 'guide';

export type Profile = {
  name: string;
  email: string;
  phone?: string;
  role: Role;
};

type ProfileContextType = {
  profile: Profile;
  updateProfile: (profile: Partial<Profile>) => void;
  clearProfile: () => void;
};

const PROFILE_KEY = 'exploregh.currentProfile';

const defaultProfile: Profile = {
  name: 'Explorer Guest',
  email: 'tourist@exploregh.com',
  role: 'tourist',
};

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  updateProfile: () => {},
  clearProfile: () => {},
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    AsyncStorage.getItem(PROFILE_KEY)
      .then((stored) => {
        if (stored) setProfile(JSON.parse(stored));
      })
      .catch(() => {});
  }, []);

  const updateProfile = (newProfile: Partial<Profile>) => {
    setProfile((currentProfile) => {
      const updated = { ...currentProfile, ...newProfile };
      AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  };

  const clearProfile = () => {
    setProfile(defaultProfile);
    AsyncStorage.removeItem(PROFILE_KEY).catch(() => {});
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
