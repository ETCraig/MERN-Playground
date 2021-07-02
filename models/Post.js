const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    text: {
        type: String,
    },
    tags: [
        {
            type: String
        }
    ],
    image_files: [
        {
            image: {
                type: String,
            }
        }
    ],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'profile'
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'profile'
            }
        }
    ],
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    date: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
    }
});

module.exports = mongoose.model('post', PostSchema)