const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const City = require('./models/City');
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');
const User = require('./models/User');

const cities = [
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Bangalore', state: 'Karnataka' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Hyderabad', state: 'Telangana' }
];

const movies = [
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    language: ['English', 'Hindi'],
    duration: 148,
    rating: 8.8,
    releaseDate: new Date('2010-07-16'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    director: 'Christopher Nolan'
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    genre: ['Action', 'Drama', 'Thriller'],
    language: ['English', 'Hindi'],
    duration: 152,
    rating: 9.0,
    releaseDate: new Date('2008-07-18'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan'
  },
  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
    genre: ['Action', 'Sci-Fi', 'Fantasy'],
    language: ['English', 'Hindi', 'Tamil'],
    duration: 181,
    rating: 8.4,
    releaseDate: new Date('2019-04-26'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
    director: 'Anthony Russo, Joe Russo'
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    genre: ['Sci-Fi', 'Drama'],
    language: ['English', 'Hindi'],
    duration: 169,
    rating: 8.6,
    releaseDate: new Date('2014-11-07'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    await City.deleteMany({});
    await Movie.deleteMany({});
    await Theatre.deleteMany({});
    await Show.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const createdCities = await City.insertMany(cities);
    console.log(`✅ Created ${createdCities.length} cities`);

    const moviesWithCities = movies.map(movie => ({
      ...movie,
      cities: createdCities.map(city => city._id)
    }));
    const createdMovies = await Movie.insertMany(moviesWithCities);
    console.log(`✅ Created ${createdMovies.length} movies`);

    const theatres = [];
    for (const city of createdCities) {
      theatres.push({
        name: `PVR ${city.name} Central`,
        city: city._id,
        address: `Mall Road, ${city.name}, ${city.state}`,
        screens: [
          {
            screenNumber: 1,
            name: 'Audi 1',
            totalSeats: 100,
            seatLayout: {
              rows: 10,
              columns: 10,
              categories: [
                {
                  name: 'Premium',
                  price: 250,
                  rows: ['A', 'B', 'C']
                },
                {
                  name: 'Gold',
                  price: 200,
                  rows: ['D', 'E', 'F', 'G']
                },
                {
                  name: 'Silver',
                  price: 150,
                  rows: ['H', 'I', 'J']
                }
              ]
            }
          },
          {
            screenNumber: 2,
            name: 'Audi 2',
            totalSeats: 80,
            seatLayout: {
              rows: 8,
              columns: 10,
              categories: [
                {
                  name: 'Premium',
                  price: 250,
                  rows: ['A', 'B']
                },
                {
                  name: 'Gold',
                  price: 200,
                  rows: ['C', 'D', 'E', 'F']
                },
                {
                  name: 'Silver',
                  price: 150,
                  rows: ['G', 'H']
                }
              ]
            }
          }
        ],
        amenities: ['Parking', 'Food Court', 'Wheelchair Accessible', 'Dolby Atmos']
      });

      theatres.push({
        name: `INOX ${city.name}`,
        city: city._id,
        address: `Cinema Complex, ${city.name}, ${city.state}`,
        screens: [
          {
            screenNumber: 1,
            name: 'Screen 1',
            totalSeats: 120,
            seatLayout: {
              rows: 10,
              columns: 12,
              categories: [
                {
                  name: 'Premium',
                  price: 300,
                  rows: ['A', 'B', 'C', 'D']
                },
                {
                  name: 'Gold',
                  price: 220,
                  rows: ['E', 'F', 'G']
                },
                {
                  name: 'Silver',
                  price: 180,
                  rows: ['H', 'I', 'J']
                }
              ]
            }
          }
        ],
        amenities: ['Parking', 'Food Court', '3D', 'IMAX']
      });
    }

    const createdTheatres = await Theatre.insertMany(theatres);
    console.log(`✅ Created ${createdTheatres.length} theatres`);

    const shows = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const showTimes = ['10:00', '13:30', '17:00', '20:30'];
    const formats = ['2D', '3D', 'IMAX', 'Dolby Atmos'];

    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const showDate = new Date(today);
      showDate.setDate(today.getDate() + dayOffset);

      for (const theatre of createdTheatres) {
        for (const screen of theatre.screens) {
          const randomMovie = createdMovies[Math.floor(Math.random() * createdMovies.length)];
          const randomLanguage = randomMovie.language[0];

          for (const showTime of showTimes) {
            const seats = [];
            for (const category of screen.seatLayout.categories) {
              for (const row of category.rows) {
                for (let col = 1; col <= screen.seatLayout.columns; col++) {
                  seats.push({
                    seatNumber: `${row}${col}`,
                    row: row,
                    column: col,
                    category: category.name,
                    price: category.price,
                    status: 'available'
                  });
                }
              }
            }

            shows.push({
              movie: randomMovie._id,
              theatre: theatre._id,
              screenNumber: screen.screenNumber,
              showDate: showDate,
              showTime: showTime,
              seats: seats,
              language: randomLanguage,
              format: formats[Math.floor(Math.random() * formats.length)]
            });
          }
        }
      }
    }

    const createdShows = await Show.insertMany(shows);
    console.log(`✅ Created ${createdShows.length} shows`);

    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '9876543210',
        role: 'user'
      },
      {
        name: 'Admin User',
        email: 'admin@bookmyshow.com',
        password: 'admin123',
        phone: '9876543211',
        role: 'admin'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Sample Login Credentials:');
    console.log('User: john@example.com / password123');
    console.log('Admin: admin@bookmyshow.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
