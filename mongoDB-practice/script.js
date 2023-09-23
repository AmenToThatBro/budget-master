// Framework for communicating with mongoDB
const mongoose = require('mongoose');
const User = require('./User');


const dbURI = 'mongodb+srv://joshcameronmorris:8Hus9ZEzANDatZXJ@tutorial.5mzgk58.mongodb.net/'

mongoose.connect(dbURI);

run();

async function run() {

    try {
        const user = await User.findOne({ name: 'Kyle', email: 'test@test.com' })
        console.log(user);
        await user.save();
        
    } catch(e) {
        console.log(e.message);

    }    
}

