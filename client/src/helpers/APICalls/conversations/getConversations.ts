import type ApiData from '../../../interface/ApiData';
import { Conversation } from '../../../interface/Conversation';
import type { FetchOptions } from '../../../interface/FetchOptions';

const getConversations = async (controller?: AbortController): Promise<ApiData<Conversation[]>> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal: controller?.signal,
  };

  return await fetch(`/conversations`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again.' },
    }));
};

export default getConversations;
