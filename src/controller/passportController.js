import passport from "passport";
import LocalStrategy from 'passport-local'
import loginRegisterService from '../service/loginRegisterService'

const configPassport = () => {
    passport.use(new LocalStrategy(async function verify(username, password, cb) {
        console.log(">>> check username: ", username, " password: ", password)
        const rawData = {
            valueLogin: username,
            password: password
        }

        let res = await loginRegisterService.handleUserLogin(rawData)
        console.log(">>> check res: ", res)

        if (res && +res.EC === 0) {
            return cb(null, res.DT);
        } else {
            return cb(null, false, { message: res.EM });
        }

    }));
}

module.exports = {
    configPassport
}
