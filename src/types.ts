export interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  posterUrl: string;
  description: string;
  releaseDate: string;
  avgRating: number;
  reviewCount: number;
  cast?: string;
  trailerUrl?: string;
}

export interface Theater {
  id: number;
  name: string;
  location: string;
}

export interface Showtime {
  id: number;
  movieId: number;
  theaterId: number;
  time: string;
  price: number;
}

export interface Booking {
  id: string;
  showtimeId: number;
  customerName: string;
  customerEmail: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isReserved: boolean;
  isSelected?: boolean;
}

export interface Banner {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  link?: string;
  color?: string;
}
