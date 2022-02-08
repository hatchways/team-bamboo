import type ApiData from '../../../interface/ApiData';
import type { FetchOptions } from '../../../interface/FetchOptions';
import type { SendMessageResponse } from '../../../interface/Message';

const sendMessage = async (
  params: {
    id: string;
  },
  data: {
    content: string;
  },
  controller?: AbortController,
): Promise<ApiData<SendMessageResponse>> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
    signal: controller?.signal,
  };

  return await fetch(`/conversations/${params.id}/messages`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
};

export default sendMessage;
