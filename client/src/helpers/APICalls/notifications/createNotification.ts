import type ApiData from '../../../interface/ApiData';
import type { FetchOptions } from '../../../interface/FetchOptions';
import type { Notification, NotifyTypeValues, NotificationReceiver } from '../../../interface/Notification';

export interface ApiDataSuccess {
  notification: Notification;
}

const createNotification = async (data: {
  notifyType: NotifyTypeValues;
  title: string;
  description: string;
  receivers: Omit<NotificationReceiver, 'read' | 'readAt'>[];
}): Promise<ApiData<ApiDataSuccess>> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };

  return await fetch(`/notifications`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
};

export default createNotification;
