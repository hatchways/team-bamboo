import type ApiData from '../../../interface/ApiData';
import type { FetchOptions } from '../../../interface/FetchOptions';
import type { Notification } from '../../../interface/Notification';

export interface ApiDataSuccess {
  notification: Notification;
}

const markNotificationRead = async (id: string, controller?: AbortController): Promise<ApiData<ApiDataSuccess>> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal: controller?.signal,
  };

  return await fetch(`/notifications/mark-read/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
};

export default markNotificationRead;
