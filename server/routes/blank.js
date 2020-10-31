const express = require('express');
const router = express.Router();


/* GET blank-page page. */
router.get('/page', function(req, res, next) {
    res.render('blank-page', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});


router.get('/settings', (req, res, next) => {
    res.render('settings', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});

router.get('/chat', (req, res, next) => {
    res.render('chat', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});

router.get('/calendar', (req, res, next) => {
    res.render('calendar', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});

router.get('/inbox', (req, res, next) => {
    res.render('inbox', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});

module.exports = router;