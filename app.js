// Basic Library Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

// Security Middleware Library Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Library Import
const mongoose = require('mongoose');

// Security Middleware Implementation
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Body Parser Implementation
app.use(bodyParser.json())

// Request Rate Limiter Implementation
const limiter = rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// MongoDb Database Connection
let URI = 'mongodb+srv://nayem:nayem_Hossain4256@cluster0.ql5divs.mongodb.net/Todoapp'
mongoose.set('strictQuery', false);
const DB_SETTINGS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
};
mongoose.connect(URI, DB_SETTINGS, (error)=>{
    console.log('Database Connection Success')
    console.log(error)
})


// Routing Implementation
app.use('/api/v1',router)


// Undefined Routing Implementation
app.use('*', (req, res) =>{
    res.status(404).json({status:'failed',data:'Not Found'})
})


module.exports =app;