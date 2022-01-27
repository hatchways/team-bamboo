import type ApiData from '../../../interface/ApiData';
import type { FetchOptions } from '../../../interface/FetchOptions';
import type { GetSitterProfiles, GetSitterProfileParams } from '../../../interface/Profile';

const getSitterProfiles = async (
  options: GetSitterProfileParams = {},
  controller?: AbortController,
): Promise<ApiData<GetSitterProfiles>> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal: controller?.signal,
  };

  const params = Object.entries(options)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');

  return await fetch(`/profile/sitters?${params}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again.' },
    }));
};

export default getSitterProfiles;
