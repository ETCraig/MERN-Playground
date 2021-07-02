const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    image_files: [
        {
            image: {
                type: String,
            }
        }
    ],
    description: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('review', ReviewSchema);