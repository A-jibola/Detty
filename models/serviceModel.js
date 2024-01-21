const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceNumber: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum: ['Shortlets', 'Ride Service', 'Resturants', 'Events', 'Others'],
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    terms: [String],
    contactInfo:{
        type: [String],
        required: true
    },
    images: [String],
    features: [String],
    price:{
        type: Number,
        required: true
    },
    isAvailable:{
        type: Boolean,
        required: true
    },
    datesUnavailable:{
        type: [Date],
        required: true
    },
    serviceDurationInMinutes:{
        type: Number,
    }
})

module.exports = mongoose.model('Services', serviceSchema);