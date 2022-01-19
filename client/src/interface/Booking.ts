import { User } from './User';

export type Status = 'pending' | 'accepted' | 'declined' | 'paid';
export interface Booking {
  _id: string;
  start: Date;
  end: Date;
  status: Status;
  user: User;
}
