const { Schema, model } = require('mongoose');

var categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    slug: {
        type: String,
        unique: true,
        index: true
    } 
}, {timestamps: true});

module.exports = model('Category', categorySchema);