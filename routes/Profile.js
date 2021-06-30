const express = require('express');
const router = express.Router();
const passport = require('passport');

const DELETE_PROFILE = require('../controllers/profile/Delete');
const GET_PROFILE = require('../controllers/profile/GetProfile');
const LOGIN_PROFILE = require('../controllers/profile/Login');
const REGISTER_PROFILE = require('../controllers/profile/Register');
const UPDATE_PROFILE = require('../controllers/profile/Update');

router.post('/register', REGISTER_PROFILE);

router.post('/login', LOGIN_PROFILE);

router.delete('/',
    passport.authenticate('jwt', {
        session: false
    }), DELETE_PROFILE
);

router.get('/user',
    passport.authenticate('jwt', {
        session: false
    }), GET_PROFILE
);

router.post('/update',
    passport.authenticate('jwt', {
        session: false
    }), UPDATE_PROFILE
);

module.exports = router;