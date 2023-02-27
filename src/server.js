'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const cors = require('cors');

// 3rd party packages
const express = require('express');
const app = express();

//local modules
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const signInRouter = require('./router/signin');
const sigsignUpRouternup = require('./router/signup');
const getUsers = require('./router/getusers');
const secret =require('./router/secret');
const product =require('./router/product')
const comment =require('./router/comment')
const favlist =require('./router/favlist')
const cart =require('./router/cart')

// Prepare the express app

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, //access-control-allow-credentials:true
  })
);

//this to parse the data from the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(signInRouter);
app.use(sigsignUpRouternup);
app.use(getUsers);
app.use(secret);
app.use(product)
app.use(comment)
app.use(favlist)
app.use(cart)

app.get('/', (req, res) => {
  res.status(200).send('Welcome To Home Page ');
});
app.use('*', notFoundHandler);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};