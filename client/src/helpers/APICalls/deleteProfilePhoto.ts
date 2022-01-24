import { FetchOptions } from '../../interface/FetchOptions';

const deleteProfilePhoto = async (photoPath: string) => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
  };
  return await fetch(`/profile/${photoPath}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteProfilePhoto;
