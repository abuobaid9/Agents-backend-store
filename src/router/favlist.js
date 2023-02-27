'use strict';

const express = require('express');
const bearer = require('../auth/bearer');
const router = express.Router();

const { favlistCollection } = require('../models/index');

router.get('/favlist/:id', bearer, handleGetOne);
router.post('/favlist', bearer, handleCreate);
router.delete('/favlist/:id', bearer, handleDelete);


async function handleGetOne(req, res) {
    const id = req.user.id;
    let theRecord = await favlistCollection.getAll(id);
    res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
    const id = req.user.id;
    let obj = req.body;
    obj.user_id = id;
    let newRecord = await favlistCollection.create(obj);
    res.status(201).json(newRecord);
}

async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await favlistCollection.deleteAll(id);
    res.status(204).json(deletedRecord);
}

module.exports = router;
