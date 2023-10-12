// These are the modules that are 'Required' for import and use.
const express = require("express");
const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;

// These are the Middleware for the JSON and urlencoded data parsing.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(htmlRoutes)
app.use(apiRoutes)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}!`)
);