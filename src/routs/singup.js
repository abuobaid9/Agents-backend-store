const express = require('express');
const bcrypt = require('bcrypt');
const {Users} =require('../models/index');
const signUpRouter = express.Router();
signUpRouter.post('/signup', async (req, res) => {

    try {
     
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const record = await Users.create(req.body);
      res.status(201).json(record);
    } catch (e) { res.status(403).send('Error Creating User'); }
  });



  module.exports = signUpRouter;