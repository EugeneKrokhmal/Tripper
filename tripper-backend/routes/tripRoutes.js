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
        if (!name || !amount || isNaN(amount)) {
            return res.status(400).json({ message: 'Invalid expense data' });
        }

        // Log received expense and its structure
        console.log('Received expense:', req.body);

        // Create expense object with defaults if not provided
        const expense = {
            name,
            amount: parseFloat(amount), // Convert amount to number
        };
        console.log('Expense object to push:', expense);

        // Add expense to trip expenses array
        trip.expenses.push(expense);

        // Save trip with new expense
        await trip.save();

        // Return success response with updated trip object
        res.status(201).json(trip);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Failed to add expense' });
    }
});

router.post('/trips/:id/edit', async (req, res) => {
    const tripId = req.params.id;
    try {
        const updatedData = req.body;

        // Find the existing trip by ID
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Update trip fields based on incoming data
        trip.name = updatedData.name || trip.name;
        trip.startDate = updatedData.startDate || trip.startDate;
        trip.endDate = updatedData.endDate || trip.endDate;
        trip.destination = updatedData.destination || trip.destination;
        trip.participants = updatedData.participants || trip.participants;
        trip.tripImage = updatedData.tripImage || trip.tripImage;
        trip.coordinates = updatedData.coordinates || trip.coordinates;
        trip.description = updatedData.description || trip.description;
        trip.shortDescription = updatedData.shortDescription || trip.shortDescription;
        trip.tasks = updatedData.tasks || trip.tasks;

        // Save updated trip
        const updatedTrip = await trip.save();

        // Return updated trip object as response
        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error('Error updating trip:', error);
        res.status(500).json({ message: 'Failed to update trip' });
    }
});

module.exports = router;
