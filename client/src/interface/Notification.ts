import { NotifyType } from '../types/NotifyType';

export type NotifyTypeKeys = keyof typeof NotifyType;
export type NotifyTypeValues = typeof NotifyType[NotifyTypeKeys];

export interface NotificationReceiver {
  id: string;
  read: boolean;
  readAt?: Date;
}

export interface Notification {
  id: string;
  notifyType: NotifyTypeValues;
  title: string;
  description: string;
  sender?: {
    userId: string;
    name: string;
    photo: string;
  };
  receivers: NotificationReceiver[];
  createdAt: string;
}
