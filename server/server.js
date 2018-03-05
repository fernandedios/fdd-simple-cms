const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { port, database } = require('./config/secret');

// database connection
mongoose.connect(database).then(() => {
  console.log('Connected to DB');
}, err => console.log(err));


app.get('/', (req, res, next) => {
  res.json('Hello World');
});

app.listen(port, (err) => {
  if(err) console.log(err);
  console.log(`Server started at port ${port}`);
});
