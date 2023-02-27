const express = require('express');
const { users } = require('../models/index');
const bearer =require('../auth/bearer');
const getUserRouter = express.Router();
getUserRouter.get('/users', async (req, res) => {
try {
    const userRecords = await users.findAll();
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
})
module.exports=getUserRouter;