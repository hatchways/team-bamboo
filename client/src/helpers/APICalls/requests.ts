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

export const getBookings = async (): Promise<BookingResponse> => {
  const response = await fetch('/requests');
  return response.json();
};

export const updateBooking = async (booking: Pick<Booking, 'status'>, id: string): Promise<SingleBookingResponse> => {
  const fetchOptions: FetchOptions = {
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify(booking),
    headers: { 'Content-Type': 'application/json' },
  };
  const url = '/requests/' + id;
  const response = await fetch(url, fetchOptions);
  return response.json();
};
