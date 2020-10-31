const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Admin, User } = require('../models');


/* GET manage/user page. */
router.get('/user', async (req, res, next) => {
    let pageId = -1;
    if (req.isAuthenticated())
        pageId = req.session.passport.user;
    const userOn = await User.findAll({ where: { admin: pageId, locked: false } });
    const userOff = await User.findAll({ where: { admin: pageId, locked: true } });
    const userNull = await User.findAll({ where: { admin: pageId, locked: null } });
    const userNotNull = await User.findAll({ where: { admin: pageId, locked: { [Op.ne] : null } } });

    res.render('manage_user', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
        number: {
            userAll: userNotNull.length + userNull.length,
            userOn: userOn.length,
            userOff: userOff.length,
            userNotNull: userNotNull.length,
            userNull: userNull.length,
        },
        arr: userNotNull.concat(userNull),
    });
});

/* GET manage/admin page. */
router.get('/admin', (req, res, next) => {
    res.render('manage_roll_call', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});

module.exports = router;