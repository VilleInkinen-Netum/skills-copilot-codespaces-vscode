// Create web server
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = require('express')(); // Import the express module and create an instance of the app
const commentsPath = path.join(__dirname, 'comments.json');

// Use body-parser middleware
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.json(JSON.parse(data));
  });
});

// Add a new comment
app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const comments = JSON.parse(data);
    const newComment = {
      id: comments.length + 1,
      text: req.body.text
    };
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments), err => {
      if (err) {
        throw err;
      }
      res.json(newComment);
    });
  });
});

// Start the server
const port = 3000; // Define the port number

app.listen(port, () => { // Start the server
    console.log(`Server is running on http://localhost:${port}`);
});
