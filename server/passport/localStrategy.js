const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Admin = require('../models/admin');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const exAdmin = await Admin.findOne({ where: { email }});
            if(exAdmin) {
                const result = await bcrypt.compare(password, exAdmin.password);
                if(result) {
                    done(null, exAdmin);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' })
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};