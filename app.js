const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var isProduction = process.env.NODE_ENV === 'production'; 

if(isProduction){
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect("mongodb://localhost:27017/mate", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
    mongoose.set("useCreateIndex", true);
}

const userRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', userRoutes);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started on port 3000.')
});