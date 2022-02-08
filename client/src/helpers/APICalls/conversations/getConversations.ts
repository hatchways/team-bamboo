import type ApiData from '../../../interface/ApiData';
import { GetConversationsResponse } from '../../../interface/Conversation';
import type { FetchOptions } from '../../../interface/FetchOptions';

const getConversations = async (controller?: AbortController): Promise<ApiData<GetConversationsResponse>> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal: controller?.signal,
  };

  const data = await fetch(`/conversations`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again.' },
    }));
  console.log(data);
  return data;
};

export default getConversations;
