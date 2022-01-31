import { Booking } from '../../interface/Booking';
import { FetchOptions } from '../../interface/FetchOptions';

interface BookingResponse {
  success?: {
    requests: Booking[];
  };
  error?: string;
}

export interface SingleBookingResponse {
  success?: {
    requests: Booking;
  };
  error?: string;
}

export interface PostBody {
  sitter: string;
  start: Date;
  end: Date;
}

export const getBookings = async (sitter = false): Promise<BookingResponse> => {
  const url = '/requests' + (sitter ? '?isSitter=true' : '');
  const response = await fetch(url);
  return response.json();
};

export const createBooking = async (body: PostBody): Promise<SingleBookingResponse> => {
  const fetchOptions: FetchOptions = {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const response = await fetch('/requests', fetchOptions);
  return response.json();
};
