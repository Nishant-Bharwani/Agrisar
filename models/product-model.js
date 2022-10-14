const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    cropName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status : { 
        type: String,
        enum: ['produced', 'sold'],
        default: 'produced'
    }
});

module.exports = mongoose.model('Product', productSchema, 'products');

// 192.168.3.1