const mongoose = require('mongoose');

//Connect to mongoDB

mongoose.connect('mongodb://localhost/event',
    {
        useNewUrlParser: true
    }
);

mongoose.connection.once('open', function(){
    console.log('mongoDB connected .... create....');
}).on('error', function(error){
    console.log('connection failed....', error)
});