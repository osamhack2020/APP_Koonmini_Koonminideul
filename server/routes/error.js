var express = require('express');
var router = express.Router();

/* GET error listing. */
router.get('/404', function(req, res, next) {
    res.render('error-404', {title : '군미니 홈페이지'});
});

router.get('/500', function(req, res, next) {
    res.render('error-500', {title : '군미니 홈페이지'});
});

module.exports = router;
