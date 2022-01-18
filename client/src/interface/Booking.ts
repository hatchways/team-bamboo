import { User } from './User';

export type Status = 'pending' | 'accepted' | 'declined' | 'paid';
export interface Booking {
  start: Date;
  end: Date;
  status: Status;
  user: User;
}
