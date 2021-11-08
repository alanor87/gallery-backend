// const passport = require('passport');
// const { ExtractJwt, Strategy } = require('passport-jwt');
// require('dotenv').config();

// const { SECRET_KEY } = process.env;
// const settings = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: SECRET_KEY,
// };

// passport.use(new Strategy(settings, async (payload, done) => {
//     console.log(payload);
// }))

// const tokenValidationPassport = async (req, res, next) => {
//     console.log(req);
//     passport.authenticate("jwt", { session: false }, () => { });
// };

// module.exports = { tokenValidationPassport };
