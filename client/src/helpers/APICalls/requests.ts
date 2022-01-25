import { Booking } from '../../interface/Booking';

interface BookingResponse {
  success?: {
    requests: Booking[];
  };
  error?: string;
}

export const getBookings = async (sitter = false): Promise<BookingResponse> => {
  const url = '/requests' + (sitter ? '?isSitter=true' : '');
  const response = await fetch(url);
  return response.json();
};
