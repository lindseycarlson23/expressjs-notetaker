
// I need to take the user input, store it in the db.json file, and then retrieve it from there

const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/api.js');

const port = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// establishing static file directory
app.use(express.static('public'));

// Work in progress
app.use('/api', api);

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET Route to return the index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



