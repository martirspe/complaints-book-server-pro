// Load environment variables from a .env file
require('dotenv').config();

// Import Express and connectDB function from database configuration file
const express = require('express');
const { connectDB } = require('./config/db');

// Import the main routes file
const routes = require('./routes/index');

// Import middleware for error handling
const { errorMiddleware } = require('./middlewares');

// Connect to the database at application startup
connectDB();

// Create an instance of the Express application
const app = express();

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
