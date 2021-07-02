const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceiptsSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    receipt_url: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('receipts', ReceiptsSchema);