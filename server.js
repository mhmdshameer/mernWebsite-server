// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Ensure this is set in your .env file
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected!');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Mongoose schema and model
const formSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    query: String,
    message: String,
});

const Form = mongoose.model('Form', formSchema);

// API endpoint for form submission
app.post('/api/submit-form', async (req, res) => {
    const formData = req.body;

    try {
        const newFormEntry = new Form(formData);
        await newFormEntry.save();
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Failed to submit form.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
