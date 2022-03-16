// require library
const mongoose = require('mongoose');

// connect to databse
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire to connection to check if it is successful
const db = mongoose.connection;

// error message
db.on('error', console.error.bind(console, 'error copnnecting to db'));

// up and running the print message
db.once('open', function(){
    console.log('successfully connected to database');
});