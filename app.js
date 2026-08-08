const express = require('express');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const tasksRouter = require('./routes/tasks');

app.use('/tasks', tasksRouter);

// Start server
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }

    console.log(`Server is listening on ${port}`);
});

module.exports = app;