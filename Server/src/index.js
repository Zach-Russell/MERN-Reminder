const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./router');

dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(router);



//TODO configure the app


app.listen(8080);
