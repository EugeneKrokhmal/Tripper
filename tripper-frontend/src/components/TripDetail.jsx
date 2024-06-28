import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditTrip from './EditTrip'; // Import the EditTrip component
import ExpensesWidget from './ExpensesWidget';
import ParticipantsWidget from './ParticipantsWidget';
import TasksWidget from './TasksWidget';

const TripDetail = () => {
    const { id } = useParams(); // Extract trip ID from URL params
    const [trip, setTrip] = useState(null); // State to hold trip details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage edit modal

    // Function to fetch trip details based on ID
    useEffect(() => {
        const fetchTrip = async () => {
            setLoading(true); // Set loading state to true before fetching
            try {
                const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/trips/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in request headers
                    }
                });
                setTrip(response.data); // Set trip details from API response
                setError(null); // Reset error state
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Trip not found'); // Handle 404 error
                } else {
                    console.error('Error fetching trip:', error);
                    setError('Failed to fetch trip'); // Generic error message
                }
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchTrip(); // Invoke fetchTrip function on component mount or ID change
    }, [id]);

    // Function to delete a trip by ID
    const deleteTrip = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/trips/${id}`);
            // Handle successful deletion (e.g., navigate to another page or show success message)
        } catch (error) {
            console.error('Error deleting trip:', error);
            setError(error.message || 'Failed to delete trip'); // Set error state on deletion error
        }
    };

    // Function to open the edit modal for the trip
    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    // Function to close the edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    // Render loading state while fetching trip details
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render error message if there's an error fetching trip details
    if (error) {
        return <p>{error}</p>;
    }

    // Render message if trip is not found
    if (!trip) {
        return <p>Trip not found.</p>;
    }

    // Render trip details and related components once loaded
    return (
        <>
            {/* Hero section displaying trip details */}
            <div className="hero mb-6 rounded-box">
                <div className="hero-overlay bg-opacity-60 rounded-box"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-6 mt-3 text-5xl font-bold">{trip.destination}</h1>
                        <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                        <p className="my-5">{trip.description}</p>
                    </div>
                </div>
            </div>

            {/* Collapse sections for participants, expenses, and tasks */}
            <div className="collapse bg-base-200 mb-3">
                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title text-xl font-medium">Participants</div>
                <div className="collapse-content">
                    <ParticipantsWidget participants={trip.participants} />
                </div>
            </div>

            <div className="collapse bg-base-200 mb-3">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">Expenses</div>
                <div className="collapse-content">
                    <ExpensesWidget expenses={trip.expenses} tripId={trip._id} />
                </div>
            </div>

            <div className="collapse bg-base-200 mb-3">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">Tasks</div>
                <div className="collapse-content">
                    <TasksWidget tasks={trip.tasks} />
                </div>
            </div>

            {/* Buttons for editing, sharing, and deleting trip */}
            <div className="flex gap-1 my-6">
                <button className="btn btn-sm btn-outline btn-accent" onClick={openEditModal}>Edit Trip</button>
                <button className="btn btn-sm btn-outline btn-accent">Share</button>
                <button className="btn btn-sm btn-outline btn-secondary" onClick={() => deleteTrip(trip._id)}>Delete Trip</button>
            </div>

            {/* Edit Trip Modal */}
            <EditTrip
                tripId={trip._id}
                isOpen={isEditModalOpen}
                closeModal={closeEditModal}
            />
        </>
    );
};

export default TripDetail;
