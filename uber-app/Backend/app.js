const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const cookieParser  = require('cookie-parser')

const userRoutes = require('./routes/user.routes');

app.use(cors());
app.use(express.json());
connectToDb()
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('App run sucessfully');
});

app.use('/users', userRoutes);

module.exports = app;
