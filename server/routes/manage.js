const express = require('express');
const router = express.Router();


/* GET manage_user page. */
router.get('/user', function(req, res, next) {
    res.render('manage_user', {
        title: '군미니 홈페이지',
        path: './',
    });
});

module.exports = router;