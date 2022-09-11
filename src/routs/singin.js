'use strict';
const express = require('express');
const basicAuth =require('../auth/basicAuth');
const signInRouter = express.Router();
signInRouter.post('/signin',basicAuth, async (req, res) => {
  res.status(200).json(req.user);
});
module.exports = signInRouter;