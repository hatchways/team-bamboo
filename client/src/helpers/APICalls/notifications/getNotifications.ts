import type ApiData from '../../../interface/ApiData';
import type { FetchOptions } from '../../../interface/FetchOptions';
import type { Notification, GetNotificationsData } from '../../../interface/Notification';

type SortFields = keyof Notification;

const getNotifications = async (
  options: {
    limit?: number;
    page?: number;
    sort?: SortFields;
    order?: 'asc' | 'desc';
    read?: boolean;
  } = {},
  controller?: AbortController,
): Promise<ApiData<GetNotificationsData>> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal: controller?.signal,
  };

  const params = Object.entries(options)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');

  return await fetch(`/notifications?${params}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again.' },
    }));
};

export default getNotifications;
