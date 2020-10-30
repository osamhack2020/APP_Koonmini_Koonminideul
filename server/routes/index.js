const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});

module.exports = router;