const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const helmet = require('helmet');
const compression = require('compression');

dotenv.config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// const sequelize = require('./models/index').sequelize;
const { sequelize } = require('./models')

const app = express();

app.use(helmet())
app.use(compression())

// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
nunjucks.configure('public', {
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
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);




app.use(function(req, res, next) {
    res.status(404).redirect('/error-404.html');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).redirect('/error-500.html')
});

module.exports = app;

// http url
console.log("http://koonmini.kro.kr:3000/")