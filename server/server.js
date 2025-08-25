const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// --- Updated CORS Configuration ---
// This is more robust and explicitly defines what is allowed.
const corsOptions = {
  origin: 'https://job-flow-in.vercel.app', // Your Vercel frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Important for authentication cookies or tokens
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// ------------------------------------

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/gmail', require('./routes/gmailRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.send('API is up and running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});