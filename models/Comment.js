const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "profile"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "post"
    },
    text: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "profile"
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    modified_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = Comments = mongoose.model("comment", CommentSchema);