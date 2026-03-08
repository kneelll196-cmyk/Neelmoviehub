import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("movies.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    genre TEXT,
    duration TEXT,
    rating TEXT,
    posterUrl TEXT,
    description TEXT,
    releaseDate TEXT,
    avgRating REAL DEFAULT 0,
    reviewCount INTEGER DEFAULT 0
  );
`);

// Migration: Add columns if they don't exist
try { db.exec("ALTER TABLE movies ADD COLUMN avgRating REAL DEFAULT 0"); } catch (e) {}
try { db.exec("ALTER TABLE movies ADD COLUMN reviewCount INTEGER DEFAULT 0"); } catch (e) {}
try { db.exec("ALTER TABLE movies ADD COLUMN cast TEXT"); } catch (e) {}
try { db.exec("ALTER TABLE movies ADD COLUMN trailerUrl TEXT"); } catch (e) {}

db.exec(`
  CREATE TABLE IF NOT EXISTS theaters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    location TEXT
  );

  CREATE TABLE IF NOT EXISTS showtimes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movieId INTEGER,
    theaterId INTEGER,
    time TEXT,
    price REAL,
    FOREIGN KEY(movieId) REFERENCES movies(id),
    FOREIGN KEY(theaterId) REFERENCES theaters(id)
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    showtimeId INTEGER,
    customerName TEXT,
    customerEmail TEXT,
    seats TEXT,
    totalAmount REAL,
    bookingDate TEXT,
    FOREIGN KEY(showtimeId) REFERENCES showtimes(id)
  );
`);

// Seed Data if empty
const movieCount = db.prepare("SELECT COUNT(*) as count FROM movies").get() as { count: number };
if (movieCount.count === 0) {
  const bollywoodMovies = [
    { title: "Jawan", genre: "Action, Thriller", duration: "2h 49m", rating: "UA", poster: "https://picsum.photos/seed/jawan/600/900", desc: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.", avgRating: 4.8, reviewCount: 12500, cast: "Shah Rukh Khan, Nayanthara, Vijay Sethupathi", trailer: "https://www.youtube.com/embed/COv527zjdko", releaseDate: "7 Sep 2023" },
    { title: "Pathaan", genre: "Action, Thriller", duration: "2h 26m", rating: "UA", poster: "https://picsum.photos/seed/pathaan/600/900", desc: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.", avgRating: 4.5, reviewCount: 10200, cast: "Shah Rukh Khan, Deepika Padukone, John Abraham", trailer: "https://www.youtube.com/embed/vqu4z34wENw", releaseDate: "25 Jan 2023" },
    { title: "Animal", genre: "Action, Crime, Drama", duration: "3h 21m", rating: "A", poster: "https://picsum.photos/seed/animal/600/900", desc: "A son's love for his father. Often fraught with conflict, and the consequences of this love.", avgRating: 4.2, reviewCount: 8900, cast: "Ranbir Kapoor, Rashmika Mandanna, Anil Kapoor", trailer: "https://www.youtube.com/embed/DydmpavqKlM", releaseDate: "1 Dec 2023" },
    { title: "Gadar 2", genre: "Action, Drama", duration: "2h 50m", rating: "UA", poster: "https://picsum.photos/seed/gadar2/600/900", desc: "Tara Singh returns to Pakistan in order to rescue his son, Charanjeet Singh, during the Indo-Pakistani War of 1971.", avgRating: 4.6, reviewCount: 15000, cast: "Sunny Deol, Ameesha Patel, Utkarsh Sharma", trailer: "https://www.youtube.com/embed/vhwr4vc_9n8", releaseDate: "11 Aug 2023" },
    { title: "Tiger 3", genre: "Action, Thriller", duration: "2h 33m", rating: "UA", poster: "https://picsum.photos/seed/tiger3/600/900", desc: "Tiger and Zoya are back to save the country and their family in this third installment of the Tiger franchise.", avgRating: 4.3, reviewCount: 7500, cast: "Salman Khan, Katrina Kaif, Emraan Hashmi", trailer: "https://www.youtube.com/embed/vEjTUDjjU6A", releaseDate: "12 Nov 2023" },
    { title: "Dunki", genre: "Comedy, Drama", duration: "2h 41m", rating: "UA", poster: "https://picsum.photos/seed/dunki/600/900", desc: "Four friends from a village in Punjab share a common dream: to go to England. Their problem is that they have neither the visa nor the ticket.", avgRating: 4.4, reviewCount: 9200, cast: "Shah Rukh Khan, Taapsee Pannu, Boman Irani", trailer: "https://www.youtube.com/embed/hS_v68q8-iY", releaseDate: "21 Dec 2023" },
    { title: "Rocky Aur Rani Kii Prem Kahaani", genre: "Comedy, Family, Romance", duration: "2h 48m", rating: "UA", poster: "https://picsum.photos/seed/rockyaurrani/600/900", desc: "A flamboyant Punjabi man and an intellectual Bengali journalist fall in love despite their differences.", avgRating: 4.1, reviewCount: 6800, cast: "Ranveer Singh, Alia Bhatt, Dharmendra", trailer: "https://www.youtube.com/embed/6mdxy3zohEk", releaseDate: "28 Jul 2023" },
    { title: "OMG 2", genre: "Comedy, Drama", duration: "2h 36m", rating: "UA", poster: "https://picsum.photos/seed/omg2/600/900", desc: "An unhappy civilian asks the court to mandate sex education in schools in a dramatic yet amusing courtroom play.", avgRating: 4.7, reviewCount: 11000, cast: "Akshay Kumar, Pankaj Tripathi, Yami Gautam", trailer: "https://www.youtube.com/embed/X2m-086BAs8", releaseDate: "11 Aug 2023" },
    { title: "Dream Girl 2", genre: "Comedy, Romance", duration: "2h 13m", rating: "UA", poster: "https://picsum.photos/seed/dreamgirl2/600/900", desc: "Karam, a small-town boy from Mathura, is struggling to pay his father's debt, who has borrowed money from nearly everyone in town.", avgRating: 3.8, reviewCount: 4500, cast: "Ayushmann Khurrana, Ananya Panday, Paresh Rawal", trailer: "https://www.youtube.com/embed/9X_9vS8z_hE", releaseDate: "25 Aug 2023" },
    { title: "Tu Jhoothi Main Makkaar", genre: "Comedy, Romance", duration: "2h 44m", rating: "UA", poster: "https://picsum.photos/seed/tjmm/600/900", desc: "Madness ensues when a 'player' in the world of romantic relationships finds a girl who's a worthy opponent.", avgRating: 4.0, reviewCount: 5200, cast: "Ranbir Kapoor, Shraddha Kapoor, Anubhav Singh Bassi", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "8 Mar 2023" },
    { title: "Zara Hatke Zara Bachke", genre: "Comedy, Romance", duration: "2h 12m", rating: "U", poster: "https://picsum.photos/seed/zhzb/600/900", desc: "A middle-class couple from Indore decides to get a divorce to take advantage of a government housing scheme.", avgRating: 3.9, reviewCount: 3800, cast: "Vicky Kaushal, Sara Ali Khan", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "2 Jun 2023" },
    { title: "Satyaprem Ki Katha", genre: "Drama, Musical, Romance", duration: "2h 24m", rating: "UA", poster: "https://picsum.photos/seed/spkk/600/900", desc: "Satyaprem, a good-for-nothing guy, falls in love with Katha, a girl who is out of his league.", avgRating: 4.1, reviewCount: 4200, cast: "Kartik Aaryan, Kiara Advani", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "29 Jun 2023" },
    { title: "Sam Bahadur", genre: "Biography, Drama, War", duration: "2h 30m", rating: "UA", poster: "https://picsum.photos/seed/sambahadur/600/900", desc: "The life of Sam Manekshaw, who was the Chief of the Army Staff of the Indian Army during the Indo-Pakistani War of 1971.", avgRating: 4.8, reviewCount: 8500, cast: "Vicky Kaushal, Fatima Sana Shaikh, Sanya Malhotra", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "1 Dec 2023" },
    { title: "12th Fail", genre: "Biography, Drama", duration: "2h 27m", rating: "U", poster: "https://picsum.photos/seed/12thfail/600/900", desc: "Based on the true story of IPS officer Manoj Kumar Sharma and IRS officer Shraddha Joshi.", avgRating: 4.9, reviewCount: 25000, cast: "Vikrant Massey, Medha Shankar", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "27 Oct 2023" },
    { title: "Fighter", genre: "Action, Adventure, Thriller", duration: "2h 46m", rating: "UA", poster: "https://picsum.photos/seed/fighter/600/900", desc: "Top IAF aviators come together in the face of imminent danger to form Air Dragons.", avgRating: 4.4, reviewCount: 9800, cast: "Hrithik Roshan, Deepika Padukone, Anil Kapoor", trailer: "https://www.youtube.com/embed/6amIq_mP4xM", releaseDate: "25 Jan 2024" },
    { title: "Merry Christmas", genre: "Crime, Drama, Thriller", duration: "2h 22m", rating: "UA", poster: "https://picsum.photos/seed/merrychristmas/600/900", desc: "Two strangers meet on a fateful Christmas Eve. A night of romance turns into a nightmare.", avgRating: 4.2, reviewCount: 3200, cast: "Katrina Kaif, Vijay Sethupathi", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "12 Jan 2024" },
    { title: "Main Atal Hoon", genre: "Biography, Drama", duration: "2h 19m", rating: "U", poster: "https://picsum.photos/seed/mainatalhoon/600/900", desc: "The life and political journey of Atal Bihari Vajpayee, three-time Prime Minister of India.", avgRating: 4.5, reviewCount: 4800, cast: "Pankaj Tripathi", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "19 Jan 2024" },
    { title: "Hanu-Man", genre: "Action, Adventure, Fantasy", duration: "2h 38m", rating: "UA", poster: "https://picsum.photos/seed/hanuman/600/900", desc: "An imaginary place called Anjanadri where the protagonist gets the powers of Hanuman and fights for Anjanadri.", avgRating: 4.7, reviewCount: 18000, cast: "Teja Sajja, Amritha Aiyer", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "12 Jan 2024" },
    { title: "Shaitaan", genre: "Horror, Thriller", duration: "2h 12m", rating: "UA", poster: "https://picsum.photos/seed/shaitaan/600/900", desc: "A family's weekend retreat turns into a nightmare when they welcome a mysterious stranger into their home.", avgRating: 4.3, reviewCount: 6500, cast: "Ajay Devgn, R. Madhavan, Jyothika", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "8 Mar 2024" },
    { title: "Crew", genre: "Comedy, Crime, Drama", duration: "2h 03m", rating: "UA", poster: "https://picsum.photos/seed/crew/600/900", desc: "Three hard-working cabin crew members of Kohinoor Airlines find themselves in a series of hilarious and unexpected situations.", avgRating: 4.1, reviewCount: 5400, cast: "Tabu, Kareena Kapoor Khan, Kriti Sanon", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "29 Mar 2024" },
    { title: "Maidaan", genre: "Biography, Drama, Sport", duration: "3h 01m", rating: "UA", poster: "https://picsum.photos/seed/maidaan/600/900", desc: "The story of the golden era of Indian football (1952–1962) and its legendary coach Syed Abdul Rahim.", avgRating: 4.6, reviewCount: 7200, cast: "Ajay Devgn, Priyamani", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "11 Apr 2024" },
    { title: "Bade Miyan Chote Miyan", genre: "Action, Sci-Fi, Thriller", duration: "2h 44m", rating: "UA", poster: "https://picsum.photos/seed/bmcm/600/900", desc: "Two elite soldiers with contrasting personalities must work together to stop a dangerous villain.", avgRating: 3.5, reviewCount: 4200, cast: "Akshay Kumar, Tiger Shroff", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "11 Apr 2024" },
    { title: "Srikanth", genre: "Biography, Drama", duration: "2h 14m", rating: "U", poster: "https://picsum.photos/seed/srikanth/600/900", desc: "The inspiring journey of Srikanth Bolla, a visually impaired industrialist and the founder of Bollant Industries.", avgRating: 4.7, reviewCount: 5800, cast: "Rajkummar Rao, Alaya F", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "10 May 2024" },
    { title: "Chandu Champion", genre: "Biography, Drama, Sport", duration: "2h 23m", rating: "UA", poster: "https://picsum.photos/seed/chanduchampion/600/900", desc: "The extraordinary real-life story of Murlikant Petkar, India's first Paralympic gold medalist.", avgRating: 4.8, reviewCount: 6900, cast: "Kartik Aaryan", trailer: "https://www.youtube.com/embed/C_70S_S_S_S", releaseDate: "14 Jun 2024" },
    { title: "Kalki 2898 AD", genre: "Action, Sci-Fi", duration: "3h 01m", rating: "UA", poster: "https://picsum.photos/seed/kalki/600/900", desc: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.", avgRating: 4.9, reviewCount: 32000, cast: "Prabhas, Amitabh Bachchan, Kamal Haasan, Deepika Padukone", trailer: "https://www.youtube.com/embed/kQDd1AhGIHk", releaseDate: "27 Jun 2024" }



  ];

  const insertMovie = db.prepare("INSERT INTO movies (title, genre, duration, rating, posterUrl, description, releaseDate, avgRating, reviewCount, cast, trailerUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  bollywoodMovies.forEach(m => {
    insertMovie.run(m.title, m.genre, m.duration, m.rating, m.poster, m.desc, m.releaseDate, m.avgRating, m.reviewCount, m.cast, m.trailer);
  });

  const suratTheaters = [
    { name: "INOX: VR Mall", location: "Dumas Road, Surat" },
    { name: "PVR: Rahul Raj Mall", location: "Piplod, Surat" },
    { name: "Cinepolis: Imperial Square", location: "Adajan, Surat" },
    { name: "Rajhans Cinemas: Piplod", location: "Piplod, Surat" },
    { name: "Valentine Multiplex", location: "Dumas Road, Surat" },
    { name: "Rajhans Cinemas: Adajan", location: "Adajan, Surat" },
    { name: "Cinepolis: Virtuous Retail Mall", location: "Magdalla, Surat" },
    { name: "Inox: DR World", location: "Aai Mata Road, Surat" }
  ];

  const insertTheater = db.prepare("INSERT INTO theaters (name, location) VALUES (?, ?)");
  suratTheaters.forEach(t => {
    insertTheater.run(t.name, t.location);
  });

  const insertShowtime = db.prepare("INSERT INTO showtimes (movieId, theaterId, time, price) VALUES (?, ?, ?, ?)");
  
  const times = ["09:00 AM", "12:15 PM", "03:30 PM", "06:45 PM", "09:00 PM", "10:30 PM", "11:45 PM"];
  
  // Get all movie and theater IDs
  const movies = db.prepare("SELECT id FROM movies").all() as { id: number }[];
  const theaters = db.prepare("SELECT id FROM theaters").all() as { id: number }[];

  movies.forEach(movie => {
    // Assign each movie to 2-3 random theaters
    const selectedTheaters = theaters.sort(() => 0.5 - Math.random()).slice(0, 3);
    selectedTheaters.forEach(theater => {
      // Add 6-7 shows per theater for this movie
      const showCount = 6 + Math.floor(Math.random() * 2); // 6 or 7
      const movieTimes = times.sort(() => 0.5 - Math.random()).slice(0, showCount);
      movieTimes.forEach(time => {
        const price = 200 + Math.floor(Math.random() * 300); // Random price between 200-500
        insertShowtime.run(movie.id, theater.id, time, price);
      });
    });
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/movies", (req, res) => {
    const movies = db.prepare("SELECT * FROM movies").all();
    res.json(movies);
  });

  app.get("/api/movies/:id", (req, res) => {
    const movie = db.prepare("SELECT * FROM movies WHERE id = ?").get(req.params.id);
    res.json(movie);
  });

  app.get("/api/showtimes/:movieId", (req, res) => {
    const showtimes = db.prepare(`
      SELECT s.*, t.name as theaterName, t.location as theaterLocation 
      FROM showtimes s 
      JOIN theaters t ON s.theaterId = t.id 
      WHERE s.movieId = ?
    `).all(req.params.movieId);
    res.json(showtimes);
  });

  app.get("/api/bookings/:showtimeId", (req, res) => {
    const bookings = db.prepare("SELECT seats FROM bookings WHERE showtimeId = ?").all(req.params.showtimeId) as { seats: string }[];
    const reservedSeats = bookings.flatMap(b => JSON.parse(b.seats));
    res.json(reservedSeats);
  });

  app.post("/api/bookings", (req, res) => {
    const { showtimeId, customerName, customerEmail, seats, totalAmount } = req.body;
    const bookingId = `BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const bookingDate = new Date().toISOString();

    try {
      const insert = db.prepare("INSERT INTO bookings (id, showtimeId, customerName, customerEmail, seats, totalAmount, bookingDate) VALUES (?, ?, ?, ?, ?, ?, ?)");
      insert.run(bookingId, showtimeId, customerName, customerEmail, JSON.stringify(seats), totalAmount, bookingDate);
      
      // Simulate Email Sending
      console.log(`[EMAIL SENT] To: ${customerEmail}, Subject: Ticket Confirmation ${bookingId}`);
      console.log(`Content: Hi ${customerName}, your tickets for seats ${seats.join(", ")} are confirmed! Total: ₹${totalAmount}`);

      res.json({ success: true, bookingId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Booking failed" });
    }
  });

  app.get("/api/bookings/user/:email", (req, res) => {
    const bookings = db.prepare(`
      SELECT b.*, s.time, s.price, t.name as theaterName, m.title as movieTitle, m.posterUrl as moviePoster
      FROM bookings b
      JOIN showtimes s ON b.showtimeId = s.id
      JOIN theaters t ON s.theaterId = t.id
      JOIN movies m ON s.movieId = m.id
      WHERE b.customerEmail = ?
      ORDER BY b.bookingDate DESC
    `).all(req.params.email);
    
    // Parse seats JSON string
    const formattedBookings = (bookings as any[]).map(b => ({
      ...b,
      seats: JSON.parse(b.seats)
    }));
    
    res.json(formattedBookings);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
