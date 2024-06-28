const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const tripController = require('../controllers/tripController');

// Routes
router.get('/trips', tripController.getTrips);
router.post('/trips', tripController.createTrip);
router.delete('/trips/:id', tripController.deleteTrip);
router.get('/trips/:id', tripController.getTripById);

router.post('/trips/:id/expenses', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        const { name, amount } = req.body;

        // Basic validation
        if (!name || !amount || isNaN(parseFloat(amount))) {
            return res.status(400).json({ message: 'Invalid expense data' });
        }

        // Add expense to trip expenses array
        trip.expenses.push({ name, amount });

        // Save trip with new expense
        await trip.save();

        // Return success response with updated trip object
        res.status(201).json(trip);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Failed to add expense' });
    }
});

module.exports = router;
