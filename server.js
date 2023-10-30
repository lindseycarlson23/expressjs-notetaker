
const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/api.js');

const PORT = process.env.PORT || 3001;

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







app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



