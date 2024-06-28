import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ExpensesWidget from './ExpensesWidget';
import ParticipantsWidget from './ParticipantsWidget';
import TasksWidget from './TasksWidget';

const TripDetail = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/trips/${id}`);
                setTrip(response.data);
                setError(null);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Trip not found');
                } else {
                    console.error('Error fetching trip:', error);
                    setError('Failed to fetch trip');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    const deleteTrip = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/trips/${id}`);
            // Handle redirection or message display after deletion
        } catch (error) {
            console.error('Error deleting trip:', error);
            setError(error.message || 'Failed to delete trip');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!trip) {
        return <p>Trip not found.</p>;
    }

    return (
        <>
            <div className="hero mb-6 rounded-box">
                <div className="hero-overlay bg-opacity-60 rounded-box"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-6 mt-3 text-5xl font-bold">{trip.destination}</h1>
                        <span>{new Date(trip.startDate).toLocaleDateString()}</span> -
                        <span>{new Date(trip.endDate).toLocaleDateString()}</span>
                        <p className="my-5">
                            {trip.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="collapse bg-base-200 mb-3">
                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title text-xl font-medium">Participants</div>
                <div className="collapse-content">
                    <ParticipantsWidget participants={trip.participants} />
                </div>
            </div>

            <div className="collapse bg-base-200 mb-3">
                <input type="radio" name="my-accordion-2" defaultChecked/>
                <div className="collapse-title text-xl font-medium">Expenses</div>
                <div className="collapse-content">
                    <ExpensesWidget expenses={trip.expenses} tripId={trip._id} />
                </div>
            </div>

            <div className="collapse bg-base-200 mb-3">
                <input type="radio" name="my-accordion-3" defaultChecked/>
                <div className="collapse-title text-xl font-medium">Tasks</div>
                <div className="collapse-content">
                    <TasksWidget tasks={trip.tasks} />
                </div>
            </div>

            <div className="flex gap-1 my-6">
                <button className="btn btn-sm btn-outline btn-accent" onClick={() => deleteTrip(trip._id)}>Delete Trip</button>
                <button className="btn btn-sm btn-outline btn-secondary">Share Trip</button>
            </div>
        </>
    );
};

export default TripDetail;
