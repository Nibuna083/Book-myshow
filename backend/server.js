const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const cityRoutes = require('./routes/cityRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cacheRoutes = require('./routes/cacheRoutes');

const { releaseStaleLocks } = require('./utils/scheduledJobs');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://*.vercel.app',
    'https://*.netlify.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas Connected Successfully');
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'BookMyShow API is running',
    version: '1.0.0',
    status: 'active'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cache', cacheRoutes);

cron.schedule('* * * * *', releaseStaleLocks);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
