const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile',
        required: true
    },
    amount: {
        type: Number,
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
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'review'
    },
});

module.exports = mongoose.model('product', ProductSchema);