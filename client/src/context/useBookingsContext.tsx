import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { getBookings, updateBooking, SingleBookingResponse } from '../helpers/APICalls/requests';
import { Booking, Status } from '../interface/Booking';
import { useSnackBar } from './useSnackbarContext';

interface BookingsContext {
  bookings: Booking[] | null;
  setBookingStatus: (id: string, status: Status) => Promise<SingleBookingResponse>;
  isLoadingBookings: boolean;
}

interface ProviderPropTypes {
  children: ReactNode;
}

const BookingsContext = createContext<BookingsContext>({
  bookings: [],
  setBookingStatus: async (): Promise<SingleBookingResponse> => ({}),
  isLoadingBookings: true,
});

export const BookingsProvider = ({ children }: ProviderPropTypes) => {
  const [bookings, setBookings] = useState<Booking[] | null>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const { updateSnackBarMessage } = useSnackBar();

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoadingBookings(true);
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
    } finally {
      setIsLoadingBookings(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const setBookingStatus = useCallback(
    async (id: string, status: Status) => {
      const apiResponse = await updateBooking({ status }, id);
      if (apiResponse.success) {
        setBookings((prevBookings) => {
          if (!prevBookings) return prevBookings;
          const bookingsCopy = [...prevBookings];
          const updatedBooking = bookingsCopy.find((b) => b._id === id);
          if (!updatedBooking) return prevBookings;
          updatedBooking.status = status;
          return bookingsCopy;
        });
      } else {
        updateSnackBarMessage('Error updading booking');
      }
      return apiResponse;
    },
    [updateSnackBarMessage],
  );

  return (
    <BookingsContext.Provider value={{ bookings, setBookingStatus, isLoadingBookings }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = (): BookingsContext => useContext(BookingsContext);
