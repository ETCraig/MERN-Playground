const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// @route   POST api/profile/register
// @desc    Register a new User
// @access  Public 
router.post('/register', [
    check('user_name', 'Name is Required.').not().isEmpty(),
    check('email', 'Please Include a Valid Email.').isEmail(),
    check('password', 'Please Enter a Password with 8 or More Characters.').isLength({ min: 8 })
], async (request, response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_name, email, password } = request.body;

    try {
        let profile = await Profile.findOne({ email });

        if (profile) {
            res.status(400).json({ errors: [{ message: "Profile with this email already exists." }] });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        profile = new Profile({
            user_name,
            email,
            password,
            avatar
        });

        const salt = await bcrypt.genSalt(10);

        profile.password = await bcrypt.hash(password, salt);

        await profile.save();

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
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error.');
    }
});

module.exports = router;