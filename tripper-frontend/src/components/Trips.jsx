import React, { useState, useEffect } from 'react';
import AddTrip from './AddTrip';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const token = localStorage.getItem('token'); // Fetch token from localStorage
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/trips`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTrips(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError(error.message || 'Failed to fetch trips');
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading state while fetching data
    }

    return (
        <>
            <div className='my-6'>
                <h1 className="text-5xl font-bold">Where this time?</h1>
                <p className="pt-6 pb-3">Tripper simplifies expense splitting and task management for seamless travel experiences, tailored for companies and groups.</p>
                <AddTrip />
            </div>
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-1 rounded-box">
                {error && <p>{error}</p>}
                {trips.map(trip => (
                    <Link to={`/trips/${trip._id}`} className="flex-row items-start space-x-4 card-body bg-base-200 rounded-box" key={trip._id}>
                        <div className="flex-1">
                            <h2 className="card-title">{trip.destination}</h2>
                            <p className="text-base-content text-opacity-40 mb-3">{new Date(trip.startDate).toLocaleDateString()}</p>
                            <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                                {/* Assuming you want to display avatars for participants */}
                                {trip.participants.slice(0, 3).map((participant, index) => (
                                    <div className="avatar" key={index}>
                                        <div className="w-6">
                                            <img src={participant.avatarUrl} alt={`Avatar ${index}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-0">
                            <button className="btn btn-sm btn-outline btn-accent" onClick={() => { }}>More</button>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Trips;