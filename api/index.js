const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb+srv://mate-user:atlas-connect@cluster0.hdvzr.mongodb.net/mate?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify: false
});

app.listen(4000, () => {
    console.log('Server started on port 4000.')
  });