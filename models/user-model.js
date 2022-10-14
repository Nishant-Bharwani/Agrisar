const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    pinCode: { type: Number, required: false },
    type: {
        type: String,
        required: true,
        enum : ['farmer','warehouseOwner', 'buyer'],
        default: 'farmer'
    }

}, { timestamps: true});

module.exports = mongoose.model('User', userSchema);