const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');

// @route   DELETE api/profile
// @desc    Deletes Profile
// @access  Private
router.delete('/', async (request, response) => {
    try {
        await Profile.findOneAndRemove({ _id: request.id });

        response.json({ message: 'Account deleted. ' });
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return response.status(400).json({ message: 'Profile is not Found.' });
        }
        response.status(500).send('Server Error.');
    }
});

module.exports = router;