const express = require('express');
const Admin = require('../models/admin');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.admin = req.user;
    next();
});

/* GET, POST account/login page. */
router
    .get('/login', (req, res, next) => {
        res.render('login', {
            title: '군미니 홈페이지',
        });
    })
    .post('/login', isNotLoggedIn, (req, res, next) => {
        console.log((req.body));
        passport.authenticate('local', (authError, admin, info) => {
            if(authError) {
                console.error(authError);
                return next(authError);
            }
            if(!admin) {
                return res.redirect('/account/login');
            }
            return req.login(admin, (loginError) => {
                if(loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    });


/* GET, POST account/register page. */
router
    .get('/register', (req, res, next) => {
        res.render('register', {
            title: '군미니 홈페이지',
        });
    })
    .post('/register/', isNotLoggedIn , async (req, res, next) => {
        console.log(req.body);
        const { email, name, password } = req.body;
        try {
            const exAdmin = await Admin.findOne({ where: { email }});
            if(exAdmin) {
                return res.redirect('/account/login?error=exist');
            }
            const hash = await bcrypt.hash(password, 12);
            await Admin.create({
                email: email,
                name: name,
                password: hash,
            });
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });


/* GET, POST account/forgot-password page. */
router
    .get('/forgot-password', (req, res, next) => {
        res.render('forgot-password', {
            title: '군미니 홈페이지',
        });
    })
        .post('/forgot-password', (req, res, next) => {
        // console.log(req.body);

        res.redirect('/account/login');
    });


/* GET, POST account/lock-screen page. */
router
    .get('/lock-screen', (req, res, next) => {
        res.render('lock-screen', {
            title: '군미니 홈페이지',
        });
    })
    .post('/lock-screen', (req, res, next) => {
        // console.log(req.body);

        res.redirect('/');
    });


router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;