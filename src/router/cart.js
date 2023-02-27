'use strict';

const express = require('express');
const bearer = require('../auth/bearer');
const router = express.Router();
const { cartCollection } = require('../models/index');


router.get('/cart', bearer, getAllCart);
router.post('/cart', bearer, createCart);
router.delete('/cart', bearer, deleteAllCart);

// Create new cart for specific User :
async function createCart(req, res) {
    let id = req.user.id;
    let obj = req.body;
    obj.user_id = id;
    let newRecord = await cartCollection.create(obj);
    res.status(201).json(newRecord);
}

// Show all product in cart to see it ( For specific user using his ID ) :
async function getAllCart(req, res) {
    const user_id = req.user.id;
    let allRecords = await cartCollection.getAll(user_id);
    res.status(200).json(allRecords);
}


// DELETE all products in specific user cart :
async function deleteAllCart(req, res) {
    const id = req.user.id;
    let deletedRecord = await cartCollection.deleteAll(id);
    if (deletedRecord == 0) {
        res.status(403).send("Access denied");
    }
    res.status(204).send('Record is deleted Successfully');
}

module.exports = router;