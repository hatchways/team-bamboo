import type ApiData from '../../../interface/ApiData';
import type { FetchOptions } from '../../../interface/FetchOptions';
import type { Conversation } from '../../../interface/Conversation';

const newConversation = async (
  data: {
    otherUserId: string;
  },
  controller?: AbortController,
): Promise<ApiData<Conversation>> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
    signal: controller?.signal,
  };

  return await fetch(`/conversations`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
};

export default newConversation;
