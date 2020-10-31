const express = require('express');
const router = express.Router();
// const db = require('../models')
// const { Op } = require('sequelize');
const { Admin, User } = require('../models');



/* GET home page. */
router.get('/', async (req, res, next) => {
    let pageId = -1;
    if (req.isAuthenticated())
        pageId = req.session.passport.user;
    const userOn = await User.findAll({ where: { admin: pageId, locked: false } });
    const userOff = await User.findAll({ where: { admin: pageId, locked: true } });
    const userNull = await User.findAll({ where: { admin: pageId, locked: null } });

    res.render('index', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
        number: {
            userAll: userOn.length + userOff.length + userNull.length,
            userOn: userOn.length,
            userOff: userOff.length,
            userNull: userNull.length,
        },
        array: [
            ['온라인 사용자', userOn],
            ['오프라인 사용자', userOff.concat(userNull)],
        ],

    });
});

module.exports = router;