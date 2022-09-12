'use strict';
const express = require('express');
const basicAuth =require('../auth/basicAuth');
const signInRouter = express.Router();
signInRouter.post('/signin', basicAuth, (req, res) => {
  const user = {
    user: req.user,
  };
  res.status(200).json(user);
});
module.exports = signInRouter;