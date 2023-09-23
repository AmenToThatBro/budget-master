const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const dbURI = 'mongodb+srv://joshcameronmorris:8Hus9ZEzANDatZXJ@tutorial.5mzgk58.mongodb.net/'

mongoose.connect(dbURI)
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err));

// middleware
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(express.json());

const transactionRouter = require('./routes/transactions');
const userRouter = require('./routes/users');

app.use('/transactions', transactionRouter);
app.use('/users', userRouter)


app.use((req, res) => {    
    res.status(404).render('404', { title: '404 Error'});
});