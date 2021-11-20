const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const sequelize = require('./db');
const router = require('./routes/index');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

var corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET, PUT, POST, DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": true,
  "credentials": true
};

app.use(cors(corsOptions));

app.use('/api',router);

const start = async() => {
  try {
    app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`)});
  } 
  catch (error) {
    console.log(error);
  }
}

start();