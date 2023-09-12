const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

//return the data from the db.json file.
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;