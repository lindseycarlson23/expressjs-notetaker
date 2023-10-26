const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');
const dbFile = "./db/db.json";

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
    console.log('Client requested /api/notes')
    readFromFile(dbFile).then((data) => res.json(JSON.parse(data)));
});
  
  // GET Route for a specific note
  notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile(dbFile)
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });
  
//   // DELETE Route for a specific tip
  // notes.delete('notes/:id', (req, res) => {
  //   const noteId = req.params.id;
  //   readFromFile(dbFile)
  //     .then((data) => JSON.parse(data))
  //     .then((json) => {
  //       // Make a new array of all tips except the one with the ID provided in the URL
  //       const result = json.filter((note) => note.id !== noteId);
  
  //       // Save that array to the filesystem
  //       writeToFile(dbFile, result);
  
  //       // Respond to the DELETE request
  //       res.json(`Item ${noteId} has been deleted 🗑️`);
  //     });
  // });

    //DELETE Route
      notes.delete('/notes/:id', (req, res) => {
        const noteId = req.params.id;
        readFromFile(dbFile, "utf8")
        .then((notes) => {
          let parseNotes;
          try {
            parseNotes = [].concat(json.parse(notes))
          } catch (err) {
            parseNotes = []
          }
          const filterNotes = parseNotes.filter((note) => note.id !== noteId);
        return writeToFile(dbFile, JSON.stringify(filterNotes));

        })
        .then(() => res.json({ok: true}))
        .catch ((err) => res.status(500).json(err));
      });


  
  // POST Route for a new note
  notes.post('/notes', (req, res) => {
    console.log(req.body);
    // add body to db.json   
    if (req.body) {
      const { title, text } = req.body;
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
      readAndAppend(newNote, dbFile);
      res.json(req.body);
    }
    else {
      res.error('Error in adding note');
    }

    
  });
  
  module.exports = notes;