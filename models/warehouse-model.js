const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    capacityLeft: { type: Number, required: true },
    city: { type: String, required: true },
    address: { type: String, required: false },
    pinCode: { type: Number, required: true },
    products: [{
        farmerId: {
            type: String
        },
        cropName: { type: String},
        quantity: { type: Number },
        price: { type: Number },
        status: {
            type: String,
            enum: ['produced', 'sold'],
            default: 'produced'
        },
    }]
});

module.exports = mongoose.model('Warehouse', warehouseSchema, 'warehouses');