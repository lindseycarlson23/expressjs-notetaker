
// I need to take the user input, store it in the db.json file, and then retrieve it from there

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET Route to return the index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


// We will use this later
// const { v4: uuidv4 } = require('uuid');
// const { readAndAppend, readFromFile } = require('./helpers/fsUtils');

// GET Route for retrieving all the notes
// app.get('/', (req, res) => {
//   // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
//     res.send('Hello World');
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




// // POST Route for submitting note
// note.post('/', (req, res) => {
//     // Destructuring assignment for the items in req.body
//     const { title, text } = req.body;

//     // If all the required properties are present
//     if (title && text) {
//     // Variable for the object we will save
//     const newNote = {
//       title,
//       text,
//     //   text_id: uuidv4(),
//     };

//     readAndAppend(newNote, './db/db.json');

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     res.json(response);
//   } else {
//     res.json('Error in posting note');
//   }
// });

// module.exports = note;