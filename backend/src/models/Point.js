const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    whatsapp: {
        type: String,
        require: true,
    },
    image_name: {
        type: String,
        // require: true,
    },
    image_url: {
        type: String,
        // require: true,
    },
    city: {
        type: String,
        require: true,
    },
    uf: {
        type: String,
        require: true,
    },
    latitude: {
        type: Number,
        // require: true,
    },
    longitude: {
        type: Number,
        // require: true,
    }
});

module.exports = mongoose.model('Point', PointSchema);