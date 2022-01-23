import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const uploadProfilePhoto = async (formData: FormData): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };
  return await fetch(`/profile/upload-avatar`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadProfilePhoto;
