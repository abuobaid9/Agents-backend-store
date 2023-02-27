'use strict';

const express = require('express');
const bearer = require('../auth/bearer');
const router = express.Router();

const { productCollection} = require('../models/index');

router.get('/product', bearer, handleGetAll);
router.get('/product/:id',bearer, handleGetOne);
router.post('/product', bearer,handleCreate);
router.put('/product/:id', bearer, handleUpdate);
router.delete('/product/:id', bearer,handleDelete);

async function handleGetAll(req, res) {
  console.log("**********",req.user);
  let id = req.user.id;
  let allRecords = await productCollection.getAll(id);
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  let id = req.params.id;
  let theRecord = await productCollection.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await productCollection.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const obj = req.body;
  obj.user_id = userId;
  let updatedRecord = await product.update(id, obj, userId)
  if (updatedRecord) {
      res.status(201).json(updatedRecord);
  } else {
      res.status(403).send("Access denied");
  }
}

async function handleDelete(req, res) {
  const id = req.user.id;
  let deletedRecord = await productCollection.deleteAll(id);
  res.status(204).json(deletedRecord);
}

module.exports = router;
