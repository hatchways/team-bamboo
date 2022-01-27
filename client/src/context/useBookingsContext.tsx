import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { getBookings, updateBooking, SingleBookingResponse } from '../helpers/APICalls/requests';
import { Booking, Status } from '../interface/Booking';

interface BookingsContext {
  bookings: Booking[] | null | undefined;
  setBookingStatus: (id: string, status: Status) => Promise<SingleBookingResponse>;
}

interface ProviderPropTypes {
  children: ReactNode;
}

const BookingsContext = createContext<BookingsContext>({
  bookings: undefined,
  setBookingStatus: async (): Promise<SingleBookingResponse> => ({}),
});

export const BookingsProvider = ({ children }: ProviderPropTypes) => {
  const [bookings, setBookings] = useState<Booking[] | null | undefined>(undefined);
  const fetchBookings = useCallback(async () => {
    try {
      const response = await getBookings();
      const { success } = response;
      if (success) {
        success.requests.forEach((request) => {
          const { start, end } = request;
          request.start = new Date(start);
          request.end = new Date(end);
        });
        setBookings(success.requests);
      } else {
        setBookings(null);
      }
    } catch (e) {
      setBookings(null);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const setBookingStatus = useCallback(async (id: string, status: Status) => {
    const booking = await updateBooking({ status }, id);
    setBookings((prevBookings) => {
      if (!prevBookings) return prevBookings;
      const bookingsCopy = [...prevBookings];
      const updatedBooking = bookingsCopy.find((b) => b._id === id);
      if (!updatedBooking) return prevBookings;
      updatedBooking.status = status;
      return bookingsCopy;
    });
    return booking;
  }, []);

  return <BookingsContext.Provider value={{ bookings, setBookingStatus }}>{children}</BookingsContext.Provider>;
};

export const useBookings = (): BookingsContext => useContext(BookingsContext);
