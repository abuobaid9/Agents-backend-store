'use strict';
const express = require('express');

const { users,
  cartCollection,
  favlistCollection
 } = require('../models/index');

const bcrypt = require('bcrypt');
const signUpRouter = express.Router();

signUpRouter.post('/signup', async (req, res) => {
  try {
    let username = req.body.username;
    let email =req.body.email;
    let password = await bcrypt.hash(req.body.password, 10);
    const record = await users.create({
      username: username,
      password: password,
      email:email,
    });
    let newCart = await cartCollection.create({
      user_id: record.id,

    });
    console.log(newCart,"****************************************");
    let newFavList = await favlistCollection.create({
      user_id: record.id,
    });
    console.log(newFavList,"****************************************");
    res.status(201).json(record);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = signUpRouter;
