const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const User = require('../models/user');


/* GET, POST data page. */
router
    .get('/', async (req, res, next) => {
        res.send('Success!');
        // res.redirect('/');
    })
    .post('/', async (req, res, next) => {
        // console.log(req.body);
        try {
            const data = await User.update({
                locked: req.body.locking,
                state: req.body.goOut,
                date: Sequelize.fn('NOW'),
            }, {
                where: { device_id: req.body.deviceId }
            })
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;