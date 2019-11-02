const mongoose = require('mongoose');

// TODO: production database in secrete
const connString = 'mongodb://localhost:27017/pilxe';

module.exports = () => {
  mongoose.set('useFindAndModify', false)

  mongoose.connect(connString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  });

  mongoose.connection
    .on('connected', () => {
      console.log('Mongoose connection open to ' + connString);
    })
    .on('disconnected', () => {
      console.log('Mongoose connection closed');
    })
    .on('error', (err) => {
      console.log('Mongoose connection error: ' + err);
    });
};
