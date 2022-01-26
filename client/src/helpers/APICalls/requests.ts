import { Booking } from '../../interface/Booking';
import { FetchOptions } from '../../interface/FetchOptions';

interface BookingResponse {
  success?: {
    requests: Booking[];
  };
  error?: string;
}

interface SingleBookingResponse {
  success?: {
    requests: Booking;
  };
  error?: string;
}

export const getBookings = async (): Promise<BookingResponse> => {
  const response = await fetch('/requests');
  return response.json();
};

export const updateBooking = async (booking: Pick<Booking, 'status'>): Promise<SingleBookingResponse> => {
  const fetchOptions: FetchOptions = {
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify(booking),
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch('/requests', fetchOptions);
  return response.json();
};
