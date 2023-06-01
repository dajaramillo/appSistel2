const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://selene:dj123@cluster0.rki2xmd.mongodb.net/applab2', {
    //useCreateIndex: true,
    //useNewUrlParser: true,
    //useFindAndModify: false
    
})
    .then(db => console.log('BD conectada'))
    .catch(err => console.error(err));