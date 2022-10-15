const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storedSchema = new Schema({
    farmerId: {
        type: String,
    },
    warehouses: [
        {
            warehouseId: {
                type: String
            }
        }
    ],
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

module.exports = mongoose.model('Stored', storedSchema, 'storeds');