const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express();
const path = require('path');



// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
const dbConfig = require('./config/database');
mongoose.connect(dbConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Load login page
app.get('/hello', (req, res) => {
    res.json({ message: "Hello Server started successfully" });  // No need to specify .ejs extension, it is assumed by default
});

// Load login page
app.get('/', (req, res) => {
    res.render('index');  // No need to specify .ejs extension, it is assumed by default
    // res.json({ message: "Hello index page loaded successfully" });

});

// Load registration page
app.get('/dashboard', (req, res) => {
    const username = req.user ? req.user.username : 'Guest'; // Replace with actual username retrieval
    res.render('dashboard', { username });
});

// Load registration page
app.get('/invalide', (req, res) => {
    res.render('invalide');
});


// Load registration page
app.get('/register-page', (req, res) => {
    res.render('register');
});



// Routes
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
