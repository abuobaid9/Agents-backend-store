'use strict';
const express = require('express');
const secretRouter = express.Router();
const bearer = require('../auth/bearer');

secretRouter.get('/secret', bearer, (req, res) => {
    res.status(200).json({
        'message': 'You are authorized to view the user secret',
        'user': req.user
    });
})


module.exports = secretRouter;