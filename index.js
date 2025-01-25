// notif123
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

// Use environment variables or defaults
const PORT = process.env.PORT || 3003;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://carldong:notif123@cluster0.642xs.mongodb.net/notif?retryWrites=true&w=majority&appName=Cluster0 ';
/* mongodb+srv://carldong:notif123@cluster0.642xs.mongodb.net/notif?retryWrites=true&w=majority&appName=Cluster0 */
// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
    

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://mern-notif.netlify.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// Routes
const UserRoutes = require('./routes/Userlist');
app.use('/users', UserRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
