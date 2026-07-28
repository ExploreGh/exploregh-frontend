import { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'tourist' | 'vendor' | 'guide';

type Profile = {
  name: string;
  email: string;
  phone?: string;
  role: Role;
};

type ProfileContextType = {
  profile: Profile;
  updateProfile: (profile: Partial<Profile>) => void;
};

const defaultProfile: Profile = {
  name: 'Explorer Guest',
  email: 'tourist@exploregh.com',
  role: 'tourist',
};

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  updateProfile: () => {},
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const updateProfile = (newProfile: Partial<Profile>) => {
    setProfile((currentProfile) => ({ ...currentProfile, ...newProfile }));
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
