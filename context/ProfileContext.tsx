import { createContext, useContext, useState, ReactNode } from 'react';

type Profile = {
  name: string;
  email: string;
};

type ProfileContextType = {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
};

const defaultProfile: Profile = {
  name: 'Explorer Guest',
  email: 'tourist@exploregh.com',
};

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  updateProfile: () => {},
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}