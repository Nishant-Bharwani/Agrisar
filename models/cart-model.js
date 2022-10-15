const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    buyerId: {
        type: String
    },

    farmerId: {
        type: String
    },
    cropName: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    status: {
        type: String,
        enum: ['produced', 'sold'],
        default: 'produced'
    }

});

module.exports = mongoose.model('Cart', cartSchema, 'carts');