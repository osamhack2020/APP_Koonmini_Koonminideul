/* Require module */
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');


/* Load .env config file */
dotenv.config();


/* Require router */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const manageRouter = require('./routes/manage');
const errorRouter = require('./routes/error');
const addRouter = require('./routes/add');
const accountRouter = require('./routes/account');
const blankRouter = require('./routes/blank')
const dataRouter = require('./routes/data');


/* Require sequelize models */
const { sequelize } = require('./models')
const passportConfig = require('./passport')


const app = express();

passportConfig();
app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
})



sequelize.sync({ force: false})
    .then(() => {
        console.log('Database connect complete')
    })
    .catch((err) => {
        console.log(err)
    })


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manage', manageRouter);
app.use('/error', errorRouter);
app.use('/add', addRouter);
app.use('/account', accountRouter);
app.use('/blank', blankRouter);
app.use('/data', dataRouter);


app.use((req, res, next) => {
    // res.status(404).redirect('/error/404');
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    // console.error(err.stack);
    // res.status(500).redirect('/error/500')
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    // res.render('error-500');
});


module.exports = app;


// http url
console.log("http://koonmini.kro.kr/");
console.log("http://localhost:3000/")