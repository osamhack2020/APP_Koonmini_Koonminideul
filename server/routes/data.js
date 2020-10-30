const express = require('express');
const router = express.Router();
const { User } = require('../models');


/* GET, POST data page. */
router
    .get('/', (req, res, next) => {
        res.redirect('/');
    })
    .post('/', (req, res, next) => {
        console.log(req.body);
    });

module.exports = router;