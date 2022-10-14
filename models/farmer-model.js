const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
    farmerId: {
        type: String,
    },
    products: [{
        cropName: { type: String },
        quantity: { type: Number  },
        price: { type: Number },
        status: {
            type: String,
            enum: ['produced', 'sold'],
            default: 'produced'
        }
    }]
});

module.exports = mongoose.model('Farmer', farmerSchema, 'farmers');