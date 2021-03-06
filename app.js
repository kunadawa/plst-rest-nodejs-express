const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

if (process.env.ENV === 'test') {
  const db = mongoose.connect('mongodb://localhost:27017/book_api_test', {useNewUrlParser:true});
} else {
  // resolved url parsing error messages by following https://stackoverflow.com/a/51935257/315385
  const db = mongoose.connect('mongodb://localhost:27017/book_api_dev', {useNewUrlParser:true});
}
const Book = require('./models/Book').instance;

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());

const bookRouter = require('./routes/books-router').router(Book);
app.use(bookRouter);

app.get('/', (request, response) => {
  response.send('Welcome to Embakasi, Sir!');
});

app.server = app.listen(port, () => {
  console.log(`Liftoff:${port}`);
});

module.exports = app;
