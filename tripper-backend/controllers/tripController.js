const Trip = require('../models/Trip');

exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: 'Failed to fetch trips' });
    }
};

exports.createTrip = async (req, res) => {
    try {
        const newTrip = new Trip(req.body);
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (error) {
        console.error('Error saving trip:', error);
        res.status(400).json({ error: 'Bad request' });
    }
};

exports.deleteTrip = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTrip = await Trip.findByIdAndDelete(id);
        if (!deletedTrip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json(deletedTrip);
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTripById = async (req, res) => {
    const { id } = req.params;

    try {
        const trip = await Trip.findById(id);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json(trip);
    } catch (error) {
        console.error('Error fetching trip:', error);
        res.status(500).json({ error: 'Failed to fetch trip' });
    }
};

const addExpenseToTrip = async (req, res) => {
    const { id } = req.params;
    const { name, amount } = req.body;

    try {
        const trip = await Trip.findById(id);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Validate and add expense to trip expenses array
        trip.expenses.push({ name, amount });

        // Save trip with new expense
        await trip.save();

        // Return success response with updated trip object
        res.status(201).json(trip);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Failed to add expense' });
    }
};
