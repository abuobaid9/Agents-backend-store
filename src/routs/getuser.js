'use strict';
const express = require('express');
const socketRouter = express.Router();
const { Users} = require('../models/index');



socketRouter.get('/getUser',  handleGet);
async function handleGet(req,res){
    const userRecords = await Users.findAll();
    res.send(userRecords);

}

module.exports = socketRouter;