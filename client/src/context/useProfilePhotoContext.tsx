import { createContext, useState, FunctionComponent, useContext, useEffect } from 'react';
import { useAuth } from './useAuthContext';

interface ProfilePhotoContext {
  photoPath: string | undefined;
  setPhotoPath: (photoPath?: string | undefined) => void;
}

export const ProfilePhotoContext = createContext<ProfilePhotoContext>({
  photoPath: '',
  setPhotoPath: (photoPath: string | undefined) => null,
});

export const ProfilePhotoProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [photoPath, setPhotoPath] = useState<string | undefined>('');
  const { profile } = useAuth();

  useEffect(() => {
    setPhotoPath(profile?.photo);
  }, [profile?.photo]);

  return <ProfilePhotoContext.Provider value={{ photoPath, setPhotoPath }}>{children}</ProfilePhotoContext.Provider>;
};

export function useProfilePhoto(): ProfilePhotoContext {
  return useContext(ProfilePhotoContext);
}
