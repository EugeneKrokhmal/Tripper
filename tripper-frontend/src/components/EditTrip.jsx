import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTrip = ({ tripId, isOpen, closeModal }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/trips/${tripId}`);
                const { name, startDate, endDate, destination, description } = response.data;
                setName(name);
                setStartDate(startDate.slice(0, 10)); // Slice to get yyyy-mm-dd format for input[type=date]
                setEndDate(endDate.slice(0, 10)); // Slice to get yyyy-mm-dd format for input[type=date]
                setDestination(destination);
                setDescription(description);
            } catch (error) {
                console.error('Error fetching trip:', error);
            }
        };

        if (isOpen) {
            fetchTrip();
        }
    }, [tripId, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/trips/${tripId}/edit`, {
                name,
                startDate,
                endDate,
                destination,
                description
            });
            console.log('Trip updated:', response.data);
            closeModal(); // Close modal after successful update
        } catch (error) {
            console.error('Error updating trip:', error);
        }
    };

    return (
        <dialog id="editTripModal" className="modal" open={isOpen}>
            <div className="modal-box">
                <strong className="text-2xl font-bold">Edit Trip</strong>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">Trip Name:</label>
                        <input type="text" className="input input-bordered input-lg" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label className="label">Start Date:</label>
                        <input type="date" className="input input-bordered input-lg" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label className="label">End Date:</label>
                        <input type="date" className="input input-bordered input-lg" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label className="label">Destination:</label>
                        <input type="text" className="input input-bordered input-lg" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label className="label">Description:</label>
                        <textarea className="textarea textarea-bordered textarea-lg" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-sm btn-outline btn-accent">Save Changes</button>
                        <button type="button" className="btn btn-sm btn-outline btn-secondary" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditTrip;
