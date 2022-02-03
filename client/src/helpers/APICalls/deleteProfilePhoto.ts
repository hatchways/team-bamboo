import { FetchOptions } from '../../interface/FetchOptions';

const deleteProfilePhoto = async (photoKey: string): Promise<void> => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
  };
  return await fetch(`/profile/photo/${photoKey}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteProfilePhoto;
