// These are the global variables.
const router = require('express').Router();
const fs = require('fs');
const util = require("util");
const uuid = require("../../helpers/uuid");
const fileRead = util.promisify(fs.readFile);
let db = require("../../db/db.json");


// This is the GET Route for the retrieving of all notes in the json file.
router.get("/notes", (req, res) => {
    console.info(`${req.method} request received for notes`);
    fileRead("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// This is the GET route for returning a note by its 'title'.
router.get("/notes/:title", (req, res) => {
    const requestedId = req.params.title;

    for (let i = 0; i < db.length; i++) {
        if (requestedId === db[i].title) {
            res.json(db[i]);
        };
    };
});

// This is the POST Route for adding notes to the db json file.
router.post("/notes", (req, res) => {
    console.info(`${req.method} has been added.`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, "./db/db.json");
        return res.send(`Successfully added the new note!`);
    } else {
        return res.send("There was an error while trying to add the new note.");
    }
});

// This function is for deleting a note from the JSON file.
router.delete('/notes/:id', (req, res) => {
    db = db.filter((x) => x.id != req.params.id);
    res.json(db);
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 4));
});

// This function is for reading the data from a file and adding what content is provided.
const readAndAppend = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};
// This function is for writing the data to the JSON file.
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`Writting to ${destination} has been successful!`)
    );

module.exports = router;