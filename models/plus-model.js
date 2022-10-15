const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plusSchema = new Schema({
    phosphorus: {
        type: Number,
    required:true,
    },
    photassium: { type: Number, required: true },
    nitrogen: { type: Number, required: true }
}
);
module.exports = mongoose.model('plusSchema', plusSchema);