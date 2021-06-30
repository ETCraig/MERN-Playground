const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');

// @route   GET api/profile/user
// @desc    Get Current User's Profile
// @access  Private 
router.get('/user', async (request, response) => {
    try {
        const profile = await Profile.findOne({ profile: request.id }).populate('profile', ['user_name', 'avatar']);

        if (!profile) {
            response.status(400).json({ message: 'No profile found. ' });
        }

        response.json(profile);
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error.');
    }
});

module.exports = router;