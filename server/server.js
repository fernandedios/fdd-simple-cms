const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const app = express();
const { port, database, secretKey } = require('./config/secret');

// database connection
mongoose.connect(database).then(() => {
  console.log('Connected to DB');
}, err => console.log(err));

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true })); // read utf-8 encoded
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies from browser

// store sessions to db
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secretKey,
  store: new MongoStore({ url: database, autoReconnect: true })
}));


app.get('/', (req, res, next) => {
  res.json('Hello World');
});

app.listen(port, (err) => {
  if(err) console.log(err);
  console.log(`Server started at port ${port}`);
});
