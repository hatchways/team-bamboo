import { FetchOptions } from '../../interface/FetchOptions';
import { GetPhotoData } from '../../interface/getPhotoData';

const getProfilePhoto = async (photoKey: string): Promise<GetPhotoData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/photo/${photoKey}`, fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getProfilePhoto;
