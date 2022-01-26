import { createContext, ReactNode, useContext, useState } from 'react';
import { getBookings, updateBooking } from '../helpers/APICalls/requests';
import { Booking } from '../interface/Booking';

interface BookingsContext {
  bookings: Booking[];
  updateBooking: () => null;
}

interface ProviderPropTypes {
  children: ReactNode;
}

const BookingsContext = createContext<BookingsContext>({
  bookings: [],
  updateBooking: () => null,
});

export const BookingsProvider = ({ children }: ProviderPropTypes) => {
  const [bookings, setBookings] = useState([]);
  return (
    <BookingsContext.Provider value={{ bookings, updateBooking: () => null }}>{children}</BookingsContext.Provider>
  );
};

export const useBookings = (): BookingsContext => useContext(BookingsContext);
