const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    serviceNumber: {
        type: Number,
        required: true
    },
    userId:{
        type: ObjectId,
        required: true,
    },
    serviceName: String,
    serviceId:{
        type: ObjectId,
        required: true
    },
    receipt:{
        type: String,
    },
    dateCreated:{
        type: Date
    },
    serviceDurationInMinutes: Number,
    durationBooked: {
        startDate: Date,
        endDate: Date
    },
    singleDateBooked:Date,
    multipleDatesBooked:[Date],
    terms: [String],
    contactInfo:{
        type: [String],
        required: true
    },
    image: String,
    features: [String],
    price: Number,
    paymentReference: String,
    paymentStatus:{
        type: String,
        enum: ['Payment Complete', 'Payment Failed', "Payment Pending"],
        required: true
    },
    location: String
})

module.exports = mongoose.model('Reservations', reservationSchema);