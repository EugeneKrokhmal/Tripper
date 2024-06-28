const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    participants: { type: [String], default: [] },
    expenses: [{
        name: { type: Object, required: true },
        amount: { type: Object, required: true }
    }],
    tripImage: { type: String },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    description: { type: String },
    shortDescription: { type: String },
    tasks: [{ type: String }]
});

module.exports = mongoose.model('Trip', tripSchema);
