const {use} = require("passport");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {User} = require("../persist/model");

passport.use(
    new LocalStrategy(async (username, password, done) =>{
        let user;
        try{
            user = await User.findOne({username: username, password:password});

            if (!user) {
                return done(null,false);
            }

            return done(null,user);
        } catch (err) {
            return done(err);
        }
    })
);

const setUpAuth = function (app) {
    app.use(passport.initialize());
    app.use(passport.authenticate("session"));

    passport.serializeUser(function (user, cb){
        cb(null, {
            id: user_id,
            username: user.username,
            animal: user.favoriteAnimal,
        });
    });

    passport.deserializeUser(function (user, cb){
        return cb(null, user);
    });

    app.get("/session", (req, res) =>{
        if (!req.user) {
            res.status(401).json({message: "unauthed"});
            return;
        }
        console.log(req.user);

        res.status(200).json({
            message: "authed",
            username: req.user.username,
            animal: req.user.favoriteAnimal,
        });
    });
};

module.exports = setUpAuth;