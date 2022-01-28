import { createContext, useState, FunctionComponent, useContext, useEffect } from 'react';
import getProfilePhoto from '../helpers/APICalls/getProfilePhoto';

interface IProfilePhotoContext {
  photoKey: string;
  photoPath: string;
  setPhotoKey: (photoKey: string) => void;
  setPhotoPath?: (photoPath: string) => void;
}

export const ProfilePhotoContext = createContext<IProfilePhotoContext>({
  photoKey: '',
  photoPath: '',
  setPhotoKey: (photoKey: string) => null,
  setPhotoPath: (photoPath: string) => null,
});

export const ProfilePhotoProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [photoKey, setPhotoKey] = useState<string>('');
  const [photoPath, setPhotoPath] = useState<string>('');

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const result = await getProfilePhoto(photoKey);
      setPhotoPath(result.imagePath);
    };
    fetchProfilePhoto();
  }, [photoKey]);

  return (
    <ProfilePhotoContext.Provider value={{ photoKey, setPhotoKey, photoPath }}>{children}</ProfilePhotoContext.Provider>
  );
};

export function useProfilePhoto(): IProfilePhotoContext {
  return useContext(ProfilePhotoContext);
}
