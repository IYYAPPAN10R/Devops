const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error("MONGODB_URI environment variable is missing!");
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas successfully");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Data Schema
const DataSchema = new mongoose.Schema({
    name: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', DataSchema);

// APIs
app.get('/api/data', async (req, res) => {
    try {
        const result = await Data.find().sort({ timestamp: -1 });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/add', async (req, res) => {
    try {
        const newData = new Data({
            name: req.body.name,
            message: req.body.message
        });
        await newData.save();
        res.json({ message: "Data added successfully!", data: newData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
