const express = require('express');
const router = express.Router();


/* GET blank-page page. */
router.get('/', function(req, res, next) {
    res.render('blank-page', {
        title: '군미니 홈페이지',
        loggedIn: req.isAuthenticated(),
    });
});


module.exports = router;