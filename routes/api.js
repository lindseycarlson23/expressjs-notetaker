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
  notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile(dbFile)
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });
  
//   // DELETE Route for a specific tip
//   tips.delete('/:tip_id', (req, res) => {
//     const tipId = req.params.tip_id;
//     readFromFile('./db/tips.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         // Make a new array of all tips except the one with the ID provided in the URL
//         const result = json.filter((tip) => tip.tip_id !== tipId);
  
//         // Save that array to the filesystem
//         writeToFile('./db/tips.json', result);
  
//         // Respond to the DELETE request
//         res.json(`Item ${tipId} has been deleted 🗑️`);
//       });
//   });
  
  // POST Route for a new note
  notes.post('/notes', (req, res) => {
    console.log(req.body);
    // add body to db.json

    
  
    if (req.body) {
      const { title, text } = req.body;
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
      readAndAppend(newNote, dbFile);
      res.json(req.body);
    }
    else {
      res.error('Error in adding tip');
    }

    
  });
  
  module.exports = notes;