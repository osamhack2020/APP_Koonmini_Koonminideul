const express = require('express');
const router = express.Router();


/* GET manage/user page. */
router.get('/user', (req, res, next) => {
    res.render('manage_user', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});

/* GET manage/admin page. */
router.get('/admin', (req, res, next) => {
    res.render('manage_admin', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});

module.exports = router;