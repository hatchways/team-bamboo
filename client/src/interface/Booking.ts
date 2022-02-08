import { User } from './User';

export type Status = 'pending' | 'accepted' | 'declined' | 'paid';

interface OtherUser extends User {
  _id: string;
}

export interface Booking {
  _id: string;
  start: Date;
  end: Date;
  status: Status;
  otherUser: OtherUser;
  hourlyRate: number;
}
