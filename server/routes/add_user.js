const express = require('express');
const router = express.Router();


/* GET add_user page. */
router.get('/', function(req, res, next) {
    res.render('add_user', {
        title: '군미니 홈페이지',
        arr_co: [1, 2, 3, 4],
    });
});

module.exports = router;