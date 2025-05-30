const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const uri = process.env.MONGODB_URL;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/flats', require('./routes/flatRoutes'));

mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log('MongoDB connection error:', err);
    });


app.listen(process.env.PORT || 5004, () => {
    console.log(`Server is running on port ${process.env.PORT || 5004}`);
});
  