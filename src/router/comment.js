'use strict';

const express = require('express');
const bearer = require('../auth/bearer');
const router = express.Router();

const { commentCollection, } = require('../models/index');

router.get('/comment/:id', bearer, addcomment);
router.post('/comment/:id', bearer, getcomments);

// user add comment on specific product
async function addcomment(req, res) {
    let userId = req.user.id;
    let obj = req.body;
    let productId = req.params.id
    obj.user_id = userId;
    obj.product_id = productId;
    let newComment = await commentCollection.create(obj);
    res.status(201).json(newComment);
}

async function getcomments(req, res) {
    let productId = req.params.id
    let productcomment = await commentCollection.getAll(productId);
    res.status(200).json(productcomment);
}


module.exports = router;