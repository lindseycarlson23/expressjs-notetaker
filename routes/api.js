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
  
  // Delete Route for a specific note
notes.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;

  readFromFile(dbFile, "utf8")
    .then((data) => {
      try {
        let parseNotes = JSON.parse(data);
        const noteIndex = parseNotes.findIndex((note) => note.id === noteId);
        if (noteIndex !== -1) {
          parseNotes.splice(noteIndex, 1);
          return writeToFile(dbFile, parseNotes).then(() =>
            res.json({ success })
          );
        } else {
          res.status(404).json({ error: "No notes found with that id" });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
    })
    .catch((err) => res.status(500).json(err));
});
  
  // POST Route for a new note
notes.post('/notes', (req, res) => {
  console.log(req.body);
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