const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.json('Hello World');
});

app.listen(PORT, (err) => {
  if(err) console.log(err);
  console.log(`Server started at port ${PORT}`);
});
