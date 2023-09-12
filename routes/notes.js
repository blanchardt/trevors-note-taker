const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//return the data from the db.json file.
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//add a new note to the db.json file.
notes.post('/', (req, res) => {
  //get the title and text of the requested body and stor it in variables.
  const { title, text } = req.body;

  if (req.body) {
    //create a new object with title, text, and id.
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    //add the new object to the json file.
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

//Went to https://stackoverflow.com/questions/61526572/express-js-delete-request to learn about delete requests.  Also credited in the README file.
notes.delete('/:id', (req, res) => {
  //get the data from the text file
  readFromFile('./db/db.json').then((data) => {
    var allData = JSON.parse(data);
    //went to https://itsjavascript.com/get-the-index-of-an-object-in-an-array-in-javascript#:~:text=We%20can%20find%20the%20index,an%20object%20in%20an%20array.
    //to figure out how to get a specific index of an object in an array.  Also credited in the README file.
    //check to see if the id in the url is in the array.
    var deletingItemLocation = allData.findIndex((note) => note.id == req.params.id);
    
    //check to see if the id was found
    if (deletingItemLocation === -1) {
      res.json(`Error in deleting note`);
    }
    else {
      //remove the specified id from the array
      allData.splice(deletingItemLocation, 1);
      
      //write to the file with the new array.
      writeToFile('./db/db.json', allData);

      res.json(`Note deleted sucessfully`);
    }
  });

});

module.exports = notes;