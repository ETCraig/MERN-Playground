const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose');
const config = require('config');
const profile = require('../models/Profile');
const Key = config.get('secretOrKey');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Key;

module.exports = authentication => {
    authentication.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            console.log('LOLZ', jwt_payload.id);
            profile.findById(jwt_payload.id).then(profile => {
                if (profile) {
                    return done(null, profile);
                }
                return done(null, false);
            }).catch(err => console.log(err));
        })
    );
}