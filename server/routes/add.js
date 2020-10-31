const express = require('express');
const router = express.Router();
const { Admin, User } = require('../models');


router.use((req, res, next) => {
    res.locals.admin = req.user;
    next();
});


/* GET, POST add/user page. */
router
    .get('/user', (req, res, next) => {
        if(req.isAuthenticated()) {
            res.render('add_user', {
                title: '군미니 홈페이지',
                loggedIn: req.isAuthenticated(),
                arr_co: [1, 2, 3, 4],
            });
        } else {
            res.redirect('/');
        }
    })
    .post('/user', (req, res, next) => {
        // console.log(req.body);
        // const rb = req.body;
        User.create({
            admin: res.locals.admin.id,
            name: req.body.name,
            service_number: req.body.service_number,
            company: req.body.company,
            comment: req.body.comment,
            phone_number: req.body.phone_number,
            contact_number: req.body.contact_number,
            registration_number: req.body.registration_number,
            device_id: req.body.device_id,
        });
        res.redirect('/');
    });

module.exports = router;