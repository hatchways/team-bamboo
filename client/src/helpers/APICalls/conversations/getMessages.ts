import type ApiData from '../../../interface/ApiData';
import { GetMessagesResponse, MessageQueryOptions } from '../../../interface/Message';
import type { FetchOptions } from '../../../interface/FetchOptions';

const getMessages = async (
  param: { id: string },
  query: MessageQueryOptions = {},
  controller?: AbortController,
): Promise<ApiData<GetMessagesResponse>> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal: controller?.signal,
  };

  const queries = Object.entries(query)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');

  return await fetch(`/conversations/${param.id}/messages?${queries}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again.' },
    }));
};

export default getMessages;
