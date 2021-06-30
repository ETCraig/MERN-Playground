const express = require('express');
const Profile = require('../../models/Profile');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();

// @route   POST api/profile/login
// @desc    Authenticate User & Get token
// @access  Public 
router.post('/login', [
    check('email', 'Please Include a Valid Email.').isEmail(),
    check('password', 'Password is Required.').exists()
], async (request, response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;

    try {
        let profile = await Profile.findOne({ email });

        if (!profile) {
            response.status(400).json({ errors: [{ message: "Invalid Credentials. " }] });
        }

        const isMatch = await bcrypt.compare(password, profile.password);

        if (!isMatch) {
            response.status(400).json({ errors: [{ message: 'Invalid Credentials.' }] });
        }

        const payload = {
            profile: {
                id: profile.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (error, token) => {
                if (error) throw error;
                response.json({ token });
            }
        )
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error.');
    }
});

module.exports = router;