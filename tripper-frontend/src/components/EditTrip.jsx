import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTrip = ({ tripId, isOpen, closeModal }) => {
    const [ name, setName] = useState('');
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
        <dialog id="editTripModal" className="modal bg-base-200 bg-opacity-60" open={isOpen}>
            <div className="modal-box bg-base-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between w-full">
                    <strong className="text-2xl font-bold">Edit {name}</strong>
                    <button className="btn btn-sm btn-circle btn-outline" onClick={closeModal}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">Trip Name:</label>
                        <input type="text" className="input input-m w-full" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="">
                        <div className="form-control w-full">
                            <label className="label">Start Date:</label>
                            <input type="date" className="input input-m w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">End Date:</label>
                            <input type="date" className="input input-m w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">Where?:</label>
                        <input type="text" className="input input-m w-full" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label className="label">Few words:</label>
                        <textarea className="textarea textarea-m" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="modal-action flex gap-1">
                        <button type="submit" className="btn btn-m btn-primary">Yalla!</button>
                        <button type="button" className="btn btn-m btn-secondary" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditTrip;
