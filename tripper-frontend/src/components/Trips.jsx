import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import AddTrip from './AddTrip';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const token = localStorage.getItem('token');
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

    const sliderSettings = {
        className: "center",
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        speed: 500
    };

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <AddTrip />
            {error && <p>{error}</p>}
            <div className="bg-base-200">
                <div className="px-8 flex-col text-left">
                    <h2 className="text-3xl font-bold">My trips</h2>
                </div>
            </div>            
            <div className="slider-container mb-8">
                <Slider {...sliderSettings}>
                    {trips.map(trip => (
                        <div key={trip._id}>
                            <Link to={`/trips/${trip._id}`} className="flex-row items-start space-x-4 card-body bg-base-200">
                                <div className="card bg-base-100 w-96 shadow-xl">
                                    <figure>
                                        <img
                                            src="https://hips.hearstapps.com/hmg-prod/images/alpe-di-siusi-sunrise-with-sassolungo-or-langkofel-royalty-free-image-1623254127.jpg"
                                            alt="" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{trip.name}</h2>
                                        <p>{trip.destination}</p>
                                        <small>{new Date(trip.startDate).toLocaleDateString()}</small>
                                        <div className="card-actions  mt-4">
                                            <button className="btn btn-sm btn-outline btn-accent" onClick={() => { }}>More</button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default Trips;
