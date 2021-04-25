const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect('mongodb+srv://mate-user:atlas-connect@cluster0.hdvzr.mongodb.net/mate?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify: false
});

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);

app.listen(4000, () => {
  console.log('Server started on port 4000.')
});