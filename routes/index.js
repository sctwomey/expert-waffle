const router = require('express').Router();
const path = require('path');


// This is the GET Route for the index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// This is the GET Route for the notes.html webpage
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;