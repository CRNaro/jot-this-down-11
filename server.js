

const fs = require("fs");
const path = require("path");
const express = require("express");
// process.env.PORT is for Heroku deployment
const PORT = process.env.PORT || 3000;
const app = express();
// Create a unique id for each note
const { v4: uuidv4 } = require("uuid");

let notes = [];
// Allows public folder to be used
app.use(express.static("public"));
app.use(express.json());

// Path to db.json and data persistence
const dbPath = path.join(__dirname, "db/db.json");

// Read from db.json when server starts
fs.readFile(dbPath, "utf8", (err, data) => {
  if (err) throw err;
  notes = JSON.parse(data);
});
// Update Get route to read from db.json
app.get("/api/notes", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    notes = JSON.parse(data);
    res.json(notes);
  });
});

// Save a new note / Post
app.post("/api/notes", (req, res) => {
  const newNote = {
    id: uuidv4(), // Generates a unique id of the new note
    title: req.body.title, // Title of the new note
    text: req.body.text, // Text of the new note
  };
  notes.push(newNote); // *!! newNote is place holder.  Need to push to db.json !!*
  fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    } else {
      res.json(newNote); // Respond to client with the new note
    }
  });
});

// Delete a note / Delete


// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  
  // Read the current notes from the file
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
    // Parse the existing notes
    notes = JSON.parse(data);

    // Filter out the note with the given ID
    notes = notes.filter((note) => note.id !== noteId);

    // Write the updated notes back to the file
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: `Note with id ${noteId} deleted` });
      }
    });
  });
});




// -HTML routes-
// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// Notes route
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// Wildcard route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// Handle Errors for undefined routes
app.use((req, res, next) => {
  if (!req.route) {
    res.status(404).send("404 Error: Page not found");
  }
  next();
});

// Other Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500 Error: Internal Server Error");
});
// Listener code for server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
