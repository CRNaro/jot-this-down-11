const fs = require('fs');
const path = require('path');
const express = require('express');
const uuid = require('uuid/v4');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static('public'));

// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Handle Errors for undefined routes
app.use((req, res) => {
    res.status(404).send('404 Error: Page not found');
});

// Other Errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Error: Internal Server Error');
});


// Listener code for server - this is for Heroku
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});