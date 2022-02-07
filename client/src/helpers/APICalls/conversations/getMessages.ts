import type ApiData from '../../../interface/ApiData';
import { Message } from '../../../interface/Message';
import type { FetchOptions } from '../../../interface/FetchOptions';

const getMessages = async (param: { id: string }, controller?: AbortController): Promise<ApiData<Message[]>> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal: controller?.signal,
  };

  return await fetch(`/conversations/${param.id}/messages`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again.' },
    }));
};

export default getMessages;
