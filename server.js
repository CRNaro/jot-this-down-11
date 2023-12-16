const fs = require('fs');
const path = require('path');
const express = require('express');
const {v4:uuidv4} = require('uuid');


const PORT = process.env.PORT || 3000;

const app = express();

let notes = [];

app.use(express.json());
app.use(express.static('public'));

// Path to db.json and data persistence
const dbPath = path.join(__dirname, '/develop/db/db.json');

// Read from db.json when server starts
fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
});
// Update Get route to read from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Internal Server Error'
            });
        }
        notes = JSON.parse(data);
        res.json(notes);    
    });
});

// UPDATE POST route to write to db.json
app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    // Add new note to notes array
    notes.push(newNote);
    // Save notes array to db.json
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Internal Server Error'
            });
        }
        // Respond to client with the new note
        res.json(newNote);
    });
});

// Route to get all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
// Save a new note
app.post('/api/notes', (req, res) => {
    const newNote ={
        id:uuidv4(),  // Generates a unique id of the new note
        title: req.body.title, // Title of the new note
        text: req.body.text    // Text of the new note
    };
    notes.push(newNote); // *!! newNote is place holder.  Need to push to db.json !!*

    res.json(newNote); // Respond to client with the new note
});



// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

// Wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

// Handle Errors for undefined routes
app.use((req, res, next) => {
    if (!req.route) {
    res.status(404).send('404 Error: Page not found');
    }
    next();
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