# jot-this-down-11
Express.js: Note Taker
    
# Note Taker

## Description 
Note Taker is an application that allows users to write, save, and delete notes. It uses an Express.js back end and stores and retrieves note data from a JSON file.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [API Routes](#api-routes)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [Bonus Features](#bonus-features)

## Installation
1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.

## Usage
1. Run the server using `npm start`.
2. Open your web browser and navigate to `http://localhost:3000`.
3. Use the web interface to write, save, and delete notes.

## Deployment
This application is deployed on Heroku. Access the live application [here](https://dashboard.heroku.com/apps/arcane-shelf-53985) .

## API Routes
- `GET /notes` - Returns the `notes.html` file.
- `GET *` - Returns the `index.html` file.
- `GET /api/notes` - Reads the `db.json` file and returns all saved notes as JSON.
- `POST /api/notes` - Saves a new note with a unique id to the `db.json` file and returns the new note.
- `DELETE /api/notes/:id` - Deletes a note with the specified id from the `db.json` file.

## Credits
- https://stackoverflow.com
- https://www.w3schools.com
- https://forum.codewithmosh.com/
- Special thanks to Xpert, the AI Learning Assistant, for providing valuable assistance and guidance.

## License

---MIT License

Copyright (c) [2023] [Christopher Robert Naro]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Features
- Express.js
- Node.js
- JSON file storage
- Unique note ID generation
- Heroku deployment

## Bonus Features
- DELETE route to remove notes

## Screenshots
![Note Taker Landing Page](./img/Screenshot_01.png.png)
![Note Taker Notes Page](./img/Screenshot_02.png.png)
![Create Note](./img/Screenshot_03.png.png)
![Save Note](./img/Screenshot_04.png.png)
![Create New Note, Delete Old](./img/Screenshot_05.png.png)
![New Note Saved Only](./img/Screenshot_06.png.png)