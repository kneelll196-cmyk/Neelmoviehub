import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ticket, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search, 
  User, 
  X,
  CreditCard,
  CheckCircle2,
  Mail,
  Sun,
  Moon,
  Star,
  Play
} from 'lucide-react';
import { Movie, Showtime, Seat, Banner } from './types';

// --- Constants ---

const CITIES = [
  "Mumbai", "Delhi-NCR", "Bengaluru", "Hyderabad", "Ahmedabad", 
  "Chandigarh", "Chennai", "Pune", "Kolkata", "Kochi", 
  "Jaipur", "Lucknow", "Indore", "Nagpur", "Patna", "Surat"
];

const PROMO_BANNERS: Banner[] = [
  {
    id: 1,
    title: "Kalki 2898 AD",
    subtitle: "Experience the future of Indian Cinema. Bookings open now!",
    imageUrl: "https://picsum.photos/seed/kalki-cinema/1200/600",
    color: "bg-black"
  },
  {
    id: 2,
    title: "Pathaan: The Return of the King",
    subtitle: "Shah Rukh Khan in a high-octane spy thriller. Watch it now!",
    imageUrl: "https://picsum.photos/seed/pathaan-action/1200/600",
    color: "bg-blue-900"
  },
  {
    id: 3,
    title: "Animal: A Father-Son Saga",
    subtitle: "The most talked-about movie of the year. Now streaming on CinePass.",
    imageUrl: "https://picsum.photos/seed/animal-drama/1200/600",
    color: "bg-stone-900"
  }
];

// --- Components ---

const CitySelector = ({ 
  selectedCity, 
  onSelect, 
  onClose 
}: { 
  selectedCity: string; 
  onSelect: (city: string) => void; 
  onClose: () => void;
}) => (
  <div className="p-6 dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold">Select City</h3>
      <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white"><X /></button>
    </div>
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input 
        type="text" 
        placeholder="Search for your city" 
        className="w-full border dark:border-gray-700 bg-transparent rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-primary"
      />
    </div>
    <div className="grid grid-cols-3 gap-3">
      {CITIES.map(city => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className={`
            py-2 px-4 rounded-md text-sm font-medium transition-all border
            ${selectedCity === city ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'}
          `}
        >
          {city}
        </button>
      ))}
    </div>
    <div className="mt-6 text-center">
      <button className="text-primary text-sm font-bold hover:underline">View All Cities</button>
    </div>
  </div>
);

const AuthModal = ({ 
  onClose, 
  onSuccess 
}: { 
  onClose: () => void; 
  onSuccess: (user: { name: string; email: string }) => void;
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSuccess({ name: mode === 'signup' ? name : "John Doe", email: email });
      setLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onSuccess({ name: "Google User", email: "google.user@example.com" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold">{mode === 'signin' ? 'Get Started' : 'Create Account'}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white"><X /></button>
      </div>

      <button 
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border dark:border-gray-700 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all mb-6 font-medium"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t dark:border-gray-700"></div></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-900 px-2 text-gray-500">OR</span></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input 
              required 
              type="text" 
              className="w-full border dark:border-gray-700 bg-transparent rounded-lg p-3 outline-none focus:border-primary" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <input 
            required 
            type="email" 
            className="w-full border dark:border-gray-700 bg-transparent rounded-lg p-3 outline-none focus:border-primary" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input required type="password" minLength={6} className="w-full border dark:border-gray-700 bg-transparent rounded-lg p-3 outline-none focus:border-primary" placeholder="Enter password" />
        </div>
        
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center justify-center"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        {mode === 'signin' ? (
          <p>Don't have an account? <button onClick={() => setMode('signup')} className="text-primary font-bold hover:underline">Sign Up</button></p>
        ) : (
          <p>Already have an account? <button onClick={() => setMode('signin')} className="text-primary font-bold hover:underline">Sign In</button></p>
        )}
      </div>
    </div>
  );
};

const MovieSlider = ({ movies, onMovieClick }: { movies: Movie[]; onMovieClick: (movie: Movie) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (movies.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-12 group shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => onMovieClick(movies[currentIndex])}
        >
          <img 
            src={movies[currentIndex].posterUrl} 
            alt={movies[currentIndex].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Latest Release
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{movies[currentIndex].title}</h2>
              <div className="flex items-center gap-4 text-white/80 text-sm md:text-base">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {movies[currentIndex].duration}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {movies[currentIndex].releaseDate}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded">{movies[currentIndex].rating}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button 
        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronRight className="w-6 h-6 rotate-180" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % movies.length); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const BannerCarousel = ({ banners }: { banners: Banner[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full h-[200px] md:h-[350px] rounded-2xl overflow-hidden mb-12 group shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={banners[currentIndex].imageUrl} 
            alt={banners[currentIndex].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{banners[currentIndex].title}</h3>
              <p className="text-sm md:text-lg text-white/90 mb-6">{banners[currentIndex].subtitle}</p>
              <button className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all shadow-lg flex items-center gap-2 w-fit">
                Book Now <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-6 flex gap-2 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Navbar = ({ 
  selectedCity, 
  onCityClick,
  user,
  onSignInClick,
  onSignOut,
  onHistoryClick,
  darkMode,
  onToggleDarkMode,
  movies,
  onMovieClick
}: { 
  selectedCity: string; 
  onCityClick: () => void;
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOut: () => void;
  onHistoryClick: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = movies.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, movies]);

  return (
    <nav className="bg-secondary text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-primary p-2 rounded-lg">
            <Ticket className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CinePass</span>
        </div>
        <div className="flex-1 max-w-md mx-8 hidden md:block relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search for Movies, Events, Plays and more" 
              className="w-full bg-white/10 border border-white/20 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {isSearchFocused && searchResults.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-2xl border dark:border-gray-700 overflow-hidden z-[100]"
              >
                {searchResults.map(movie => (
                  <button
                    key={movie.id}
                    onClick={() => {
                      onMovieClick(movie);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left border-b last:border-0 dark:border-gray-700"
                  >
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title} 
                      className="w-12 h-16 object-cover rounded shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-bold text-sm">{movie.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{movie.genre}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{movie.avgRating}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={onToggleDarkMode}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <div 
            className="flex items-center gap-1 text-sm cursor-pointer hover:text-primary transition-colors"
            onClick={onCityClick}
          >
            <MapPin className="w-4 h-4" />
            <span>{selectedCity}</span>
            <ChevronRight className="w-3 h-3 rotate-90" />
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium hidden sm:block">Hi, {user.name.split(' ')[0]}</span>
                
                {/* Simple Dropdown on Hover */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-[100] border dark:border-gray-700">
                  <button 
                    onClick={onHistoryClick}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" /> Booking History
                  </button>
                  <button 
                    onClick={onSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onSignInClick}
              className="bg-primary px-4 py-1.5 rounded text-sm font-semibold hover:bg-opacity-90 transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const BookingHistory = ({ email, onBack }: { email: string; onBack: () => void }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/bookings/user/${email}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 transition-colors duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-3xl font-bold dark:text-white">Your Booking History</h2>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-12 text-center border-2 border-dashed dark:border-gray-700">
          <Ticket className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No bookings found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't booked any tickets yet. Time to watch a movie!</p>
          <button onClick={onBack} className="bg-primary text-white px-8 py-3 rounded-lg font-bold">
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border dark:border-gray-700 flex flex-col md:flex-row">
              <div className="w-full md:w-48 h-48 md:h-auto relative">
                <img 
                  src={booking.moviePoster} 
                  alt={booking.movieTitle} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold dark:text-white">{booking.movieTitle}</h3>
                    <span className="text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded uppercase">Confirmed</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {booking.theaterName}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Date & Time</p>
                      <p className="font-medium dark:text-gray-200">{new Date(booking.bookingDate).toLocaleDateString()} | {booking.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Seats</p>
                      <p className="font-medium dark:text-gray-200">{booking.seats.join(', ')}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Booking ID</p>
                    <p className="font-mono text-sm dark:text-gray-300">{booking.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Amount Paid</p>
                    <p className="text-lg font-bold text-primary">₹{booking.totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

const MovieCard = ({ movie, onClick }: { movie: Movie; onClick: () => void | Promise<void>; key?: React.Key }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden movie-card-shadow cursor-pointer group transition-colors duration-300"
    onClick={onClick}
  >
    <div className="relative aspect-[2/3] overflow-hidden">
      <img 
        src={movie.posterUrl} 
        alt={movie.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 text-white">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold bg-primary px-2 py-0.5 rounded uppercase">{movie.rating}</span>
          <span className="text-xs">{movie.genre.split(',')[0]}</span>
        </div>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg leading-tight mb-1 truncate dark:text-white">{movie.title}</h3>
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-500 dark:text-gray-400 text-sm">{movie.genre}</p>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold dark:text-white">{movie.avgRating}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-wider">
        <span>{movie.duration}</span>
        <span>{(movie.reviewCount?.toLocaleString() || '0')} reviews</span>
      </div>
    </div>
  </motion.div>
);

const SeatSelection = ({ 
  showtime, 
  reservedSeats, 
  onConfirm 
}: { 
  showtime: Showtime & { theaterName: string }; 
  reservedSeats: string[]; 
  onConfirm: (selectedSeats: string[]) => void 
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 10 }, (_, i) => i + 1);

  const toggleSeat = (seatId: string) => {
    if (reservedSeats.includes(seatId)) return;
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const getSeatCategory = (row: string) => {
    if (['A', 'B'].includes(row)) return { name: 'VIP', price: showtime.price + 150, color: 'border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' };
    if (['C', 'D', 'E'].includes(row)) return { name: 'Premium', price: showtime.price + 50, color: 'border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20' };
    return { name: 'Standard', price: showtime.price, color: 'border-primary/30 text-primary hover:bg-primary/10 dark:hover:bg-primary/20' };
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId.charAt(0);
      return total + getSeatCategory(row).price;
    }, 0);
  };

  return (
    <div className="p-6">
      <div className="mb-12 text-center">
        <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 shadow-inner relative overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />
        </div>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Screen this way</p>
      </div>

      <div className="flex flex-col gap-4 items-center mb-12">
        {rows.map(row => {
          const category = getSeatCategory(row);
          return (
            <div key={row} className="flex gap-4 items-center">
              <span className="w-4 text-xs font-bold text-gray-400">{row}</span>
              <div className="flex gap-2">
                {cols.map(col => {
                  const seatId = `${row}${col}`;
                  const isReserved = reservedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);
                  
                  return (
                    <motion.button
                      key={seatId}
                      whileHover={!isReserved ? { scale: 1.15 } : {}}
                      whileTap={!isReserved ? { scale: 0.9 } : {}}
                      disabled={isReserved}
                      onClick={() => toggleSeat(seatId)}
                      className={`
                        w-8 h-8 rounded-t-lg text-[10px] font-bold transition-all border
                        ${isReserved ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-transparent cursor-not-allowed' : 
                          isSelected ? 'bg-primary text-white border-primary shadow-lg' : 
                          `bg-white dark:bg-gray-900 ${category.color}`}
                      `}
                    >
                      {col}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-gray-200 dark:bg-gray-800"></div>
          <span className="text-gray-500">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-white dark:bg-gray-900 border border-primary/30"></div>
          <span className="text-gray-500">Standard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-white dark:bg-gray-900 border border-blue-500"></div>
          <span className="text-gray-500">Premium (+₹50)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-white dark:bg-gray-900 border border-yellow-500"></div>
          <span className="text-gray-500">VIP (+₹150)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-primary"></div>
          <span className="text-gray-500">Selected</span>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {selectedSeats.length > 0 ? `${selectedSeats.length} Seats Selected` : 'Select your seats'}
          </p>
          <p className="text-2xl font-bold text-primary">₹{calculateTotal()}</p>
        </div>
        <button 
          disabled={selectedSeats.length === 0}
          onClick={() => onConfirm(selectedSeats)}
          className="w-full sm:w-auto bg-primary text-white px-12 py-3 rounded-lg font-bold shadow-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Seats
        </button>
      </div>
    </div>
  );
};

const PaymentModal = ({ 
  amount, 
  onSuccess, 
  onClose 
}: { 
  amount: number; 
  onSuccess: (details: { name: string; email: string }) => void;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'card_details' | 'processing'>('details');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });
  const [error, setError] = useState<string | null>(null);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Mock validation
    const cardNumber = cardData.number.replace(/\s/g, '');
    if (cardNumber.length !== 16) {
      setError('Invalid card number. Must be 16 digits.');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      setError('Invalid expiry date. Use MM/YY.');
      return;
    }
    if (cardData.cvv.length !== 3) {
      setError('Invalid CVV. Must be 3 digits.');
      return;
    }

    setStep('processing');
    setTimeout(() => {
      onSuccess(formData);
    }, 2000);
  };

  const handleUPISubmit = () => {
    setStep('processing');
    setTimeout(() => {
      onSuccess(formData);
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Checkout</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-black"><X /></button>
      </div>

      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="John Doe"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="john@example.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <Mail className="w-3 h-3" /> Your ticket will be sent here
            </p>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-bold mt-4">
            Continue to Payment
          </button>
        </form>
      )}

      {step === 'payment' && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-dashed">
            <div className="flex justify-between mb-2">
              <span>Ticket Amount</span>
              <span>₹{amount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total Payable</span>
              <span className="text-primary">₹{amount}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button onClick={() => setStep('card_details')} className="w-full flex items-center justify-between p-4 border rounded-xl hover:border-primary transition-all group">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><CreditCard /></div>
                <div className="text-left">
                  <p className="font-bold">Credit / Debit Card</p>
                  <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-primary" />
            </button>
            <button onClick={handleUPISubmit} className="w-full flex items-center justify-between p-4 border rounded-xl hover:border-primary transition-all group">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600"><CheckCircle2 /></div>
                <div className="text-left">
                  <p className="font-bold">UPI Payment</p>
                  <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-primary" />
            </button>
          </div>
        </div>
      )}

      {step === 'card_details' && (
        <form onSubmit={handleCardSubmit} className="space-y-4">
          <button 
            type="button"
            onClick={() => setStep('payment')}
            className="text-xs text-primary font-bold flex items-center gap-1 mb-2"
          >
            <ChevronRight className="w-3 h-3 rotate-180" /> Back to Payment Options
          </button>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-xs text-gray-500 mb-1">Total Amount</p>
            <p className="text-lg font-bold">₹{amount}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input 
              required
              type="text" 
              maxLength={19}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="4444 4444 4444 4444"
              value={cardData.number}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                setCardData({ ...cardData, number: val });
              }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input 
                required
                type="text" 
                maxLength={5}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={e => {
                  let val = e.target.value.replace(/\D/g, '');
                  if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                  setCardData({ ...cardData, expiry: val });
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input 
                required
                type="password" 
                maxLength={3}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="123"
                value={cardData.cvv}
                onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-bold">{error}</p>
          )}

          <div className="pt-4">
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-bold shadow-lg hover:bg-opacity-90 transition-all">
              Pay ₹{amount}
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-3">
              Your payment is secure and encrypted. This is a mock payment gateway.
            </p>
          </div>
        </form>
      )}

      {step === 'processing' && (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-bold text-lg">Processing your payment...</p>
          <p className="text-gray-500">Please do not refresh the page</p>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<(Showtime & { theaterName: string })[]>([]);
  const [isLoadingShowtimes, setIsLoadingShowtimes] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState<(Showtime & { theaterName: string }) | null>(null);
  const [reservedSeats, setReservedSeats] = useState<string[]>([]);
  const [isLoadingSeats, setIsLoadingSeats] = useState(false);
  const [bookingStep, setBookingStep] = useState<'movie' | 'seats' | 'payment' | 'success' | 'history'>('movie');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  // City Selection State
  const [selectedCity, setSelectedCity] = useState<string>("Surat");
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);

  // Auth State
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    setIsLoadingMovies(true);
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setIsLoadingMovies(false);
      });
  }, []);

  const handleMovieClick = async (movie: Movie) => {
    setSelectedMovie(movie);
    setIsLoadingShowtimes(true);
    setShowtimes([]);
    const res = await fetch(`/api/showtimes/${movie.id}`);
    const data = await res.json();
    setShowtimes(data);
    setIsLoadingShowtimes(false);
  };

  const handleShowtimeSelect = async (showtime: Showtime & { theaterName: string }) => {
    setSelectedShowtime(showtime);
    setIsLoadingSeats(true);
    const res = await fetch(`/api/bookings/${showtime.id}`);
    const data = await res.json();
    setReservedSeats(data);
    setIsLoadingSeats(false);
    setBookingStep('seats');
  };

  const handleSeatsConfirm = (seats: string[]) => {
    setSelectedSeats(seats);
    setBookingStep('payment');
  };

  const handlePaymentSuccess = async (details: { name: string; email: string }) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        showtimeId: selectedShowtime?.id,
        customerName: details.name,
        customerEmail: details.email,
        seats: selectedSeats,
        totalAmount: selectedSeats.reduce((total, seatId) => {
          const row = seatId.charAt(0);
          const price = ['A', 'B'].includes(row) ? (selectedShowtime?.price || 0) + 150 : 
                        ['C', 'D', 'E'].includes(row) ? (selectedShowtime?.price || 0) + 50 : 
                        (selectedShowtime?.price || 0);
          return total + price;
        }, 0)
      })
    });
    const data = await res.json();
    if (data.success) {
      setBookingId(data.bookingId);
      setBookingStep('success');
    }
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <Navbar 
        selectedCity={selectedCity} 
        onCityClick={() => setIsCityModalOpen(true)} 
        user={user}
        onSignInClick={() => setIsAuthModalOpen(true)}
        onSignOut={() => setUser(null)}
        onHistoryClick={() => setBookingStep('history')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        movies={movies}
        onMovieClick={handleMovieClick}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Auth Modal */}
        <AnimatePresence>
          {isAuthModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
              >
                <AuthModal 
                  onClose={() => setIsAuthModalOpen(false)}
                  onSuccess={(userData) => {
                    setUser(userData);
                    setIsAuthModalOpen(false);
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* City Selection Modal */}
        <AnimatePresence>
          {isCityModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
              >
                <CitySelector 
                  selectedCity={selectedCity}
                  onSelect={(city) => {
                    setSelectedCity(city);
                    setIsCityModalOpen(false);
                  }}
                  onClose={() => setIsCityModalOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {bookingStep === 'history' && user && (
          <BookingHistory 
            email={user.email} 
            onBack={() => setBookingStep('movie')} 
          />
        )}

        {bookingStep === 'movie' && (
          <>
            {/* Latest Release Slider */}
            {isLoadingMovies ? (
              <Skeleton className="w-full h-[300px] md:h-[450px] rounded-2xl mb-12" />
            ) : (
              <MovieSlider 
                movies={movies.slice(0, 4)} 
                onMovieClick={handleMovieClick} 
              />
            )}

            {/* Promotional Banners */}
            <BannerCarousel banners={PROMO_BANNERS} />

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Recommended Movies</h2>
              <button className="text-primary font-semibold flex items-center gap-1 hover:underline">
                See All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {isLoadingMovies ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[2/3] rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              ) : (
                movies.map(movie => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onClick={() => handleMovieClick(movie)} 
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* Movie Detail Modal / Overlay */}
        <AnimatePresence>
          {selectedMovie && bookingStep === 'movie' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 dark:text-white w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              >
                <div className="w-full md:w-1/3 h-64 md:h-auto relative">
                  <img 
                    src={selectedMovie.posterUrl} 
                    alt={selectedMovie.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setSelectedMovie(null)}
                    className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full md:hidden"
                  >
                    <X />
                  </button>
                </div>
                <div className="flex-1 p-8 overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedMovie.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedMovie.duration}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedMovie.releaseDate}</span>
                        <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-black dark:text-white">{selectedMovie.avgRating}</span>
                          <span className="text-xs">({(selectedMovie.reviewCount?.toLocaleString() || '0')} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedMovie(null)}
                      className="text-gray-400 hover:text-black hidden md:block"
                    >
                      <X className="w-8 h-8" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">About the movie</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{selectedMovie.description}</p>
                    
                    {selectedMovie.cast && (
                      <div className="mb-4">
                        <h4 className="font-bold mb-1 text-sm uppercase text-gray-400 tracking-wider">Cast</h4>
                        <p className="text-gray-700 dark:text-gray-300">{selectedMovie.cast}</p>
                      </div>
                    )}

                    {selectedMovie.trailerUrl && (
                      <button 
                        onClick={() => window.open(selectedMovie.trailerUrl, '_blank')}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                      >
                        <Play className="w-4 h-4 fill-current" /> Watch Trailer
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-bold text-xl border-b dark:border-gray-700 pb-2">Select Showtime</h4>
                    {isLoadingShowtimes ? (
                      <div className="space-y-8">
                        {[1, 2].map(i => (
                          <div key={i} className="space-y-4">
                            <Skeleton className="h-6 w-48" />
                            <div className="flex gap-3">
                              {[1, 2, 3].map(j => (
                                <div key={j}>
                                  <Skeleton className="h-10 w-20" />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : showtimes.length > 0 ? (
                      <div className="space-y-6">
                        {Array.from(new Set(showtimes.map(s => s.theaterName))).map(theaterName => (
                          <div key={theaterName} className="space-y-3">
                            <h5 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" /> {theaterName}
                            </h5>
                            <div className="flex flex-wrap gap-3">
                              {showtimes.filter(s => s.theaterName === theaterName).map(showtime => (
                                <button
                                  key={showtime.id}
                                  disabled={isLoadingSeats}
                                  onClick={() => handleShowtimeSelect(showtime)}
                                  className={`border border-green-500 text-green-600 dark:text-green-400 px-4 py-2 rounded hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-sm font-bold flex items-center gap-2 ${isLoadingSeats && selectedShowtime?.id === showtime.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                  {isLoadingSeats && selectedShowtime?.id === showtime.id ? (
                                    <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                  ) : null}
                                  {showtime.time}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 dark:text-gray-500 italic">No showtimes available for this movie.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Seat Selection View */}
        {bookingStep === 'seats' && selectedShowtime && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="bg-secondary text-white p-6 flex justify-between items-center">
              <div>
                <button 
                  onClick={() => setBookingStep('movie')}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1 mb-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" /> Back to Movie
                </button>
                <h2 className="text-2xl font-bold">{selectedMovie?.title}</h2>
                <p className="text-sm text-gray-400">{selectedShowtime.theaterName} | {selectedShowtime.time}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-gray-400">Tickets</p>
                <p className="text-2xl font-bold text-primary">{selectedSeats.length || 0}</p>
              </div>
            </div>
            <SeatSelection 
              showtime={selectedShowtime} 
              reservedSeats={reservedSeats}
              onConfirm={handleSeatsConfirm}
            />
          </motion.div>
        )}

        {/* Payment Modal */}
        <AnimatePresence>
          {bookingStep === 'payment' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-md rounded-2xl overflow-hidden"
              >
                <PaymentModal 
                  amount={selectedSeats.length * (selectedShowtime?.price || 0)}
                  onSuccess={handlePaymentSuccess}
                  onClose={() => setBookingStep('seats')}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success View */}
        {bookingStep === 'success' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden text-center"
          >
            <div className="bg-green-500 p-12 text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="opacity-90">Your tickets have been sent to your email.</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase">Booking ID</p>
                  <p className="font-bold text-lg">{bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase">Amount Paid</p>
                  <p className="font-bold text-lg text-primary">₹{selectedSeats.length * (selectedShowtime?.price || 0)}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-left space-y-2">
                <p className="font-bold text-gray-800">{selectedMovie?.title}</p>
                <p className="text-sm text-gray-600 flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedShowtime?.theaterName}</p>
                <p className="text-sm text-gray-600 flex items-center gap-2"><Clock className="w-4 h-4" /> {selectedShowtime?.time} | {new Date().toLocaleDateString()}</p>
                <p className="text-sm text-gray-600 flex items-center gap-2"><Ticket className="w-4 h-4" /> Seats: {selectedSeats.join(', ')}</p>
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="bg-secondary text-white/50 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Ticket className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">CinePass</span>
            </div>
            <p className="text-sm">Your one-stop destination for movie tickets and entertainment experiences.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Movies by Genre</h4>
            <ul className="text-sm space-y-2">
              <li>Action</li>
              <li>Comedy</li>
              <li>Drama</li>
              <li>Horror</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="text-sm space-y-2">
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">f</div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">t</div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">i</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 text-center text-xs">
          © 2024 CinePass Entertainment Pvt. Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
