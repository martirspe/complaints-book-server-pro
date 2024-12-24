// Load environment variables from a .env file
require('dotenv').config();

// Import Express and connectDB function from database configuration file
const express = require('express');
const { connectDB } = require('./config/db');

// Import CORS Policy
const cors = require('cors');

// Import the main routes file
const routes = require('./routes/index');

// Import middleware for error handling
const { errorMiddleware } = require('./middlewares');

// Connect to the database at application startup
connectDB();

// Create an instance of the Express application
const app = express();

// List of allowed domains
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

// Custom CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS bloqueado: Dominio no permitido.'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS with restrictive settings
app.use(cors(corsOptions));

// Middleware to parse the body of requests as JSON
app.use(express.json());

// Routes: use the routes defined in the routes/index.js file
app.use('/', routes);

// Handle 404 errors: respond with a JSON message if the requested path is not found
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Middleware for error handling
app.use(errorMiddleware);

// Start the Express server on the port defined in the environment variables or on port 3000 by default
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
