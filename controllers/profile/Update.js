const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');
const { exists } = require('../../models/Profile');

// @route   POST api/profile/update
// @desc    Create or Update a User's Profile
// @access  Private 
router.post('/update', async (request, response) => {
    try {
        let profile = await Profile.findOne({ profile: request.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { _id: request.id },
                { $set: request.newData },
                { new: true }
            );

            return response.json(profile);
        } else {
            response.status(400).json({ errors: [{ message: "Profile doesn't exists. " }] });
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error.');
    }
});

module.exports = router;