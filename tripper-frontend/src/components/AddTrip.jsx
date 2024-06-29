import React, { useState } from 'react';
import axios from 'axios';

const AddTrip = () => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/trips`, {
                name,
                startDate,
                endDate,
                destination,
                description,
                owner: 'userId',
                participants: ['userId']
            });
            console.log('Trip saved:', response.data);
            // Optionally, reset form fields after successful submission
            setName('');
            setStartDate('');
            setEndDate('');
            setDestination('');
            setDescription('');
            closeModal(); // Close modal after submission
        } catch (error) {
            console.error('Error saving trip:', error);
        }
    };

    const openModal = () => {
        const modal = document.getElementById('addTripModal');
        if (modal) {
            modal.showModal();
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('addTripModal');
        if (modal) {
            modal.close();
        }
    };

    return (
        <>
            <div className="flex">
                <button className="w-full btn btn-primary my-6 btn-outline btn-accent" onClick={openModal}>Let's Go!</button>
            </div>
            <dialog id="addTripModal" className="modal bg-base-200 bg-opacity-60">
                <div className="modal-box bg-base-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between w-full"></div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">Trip Name:</label>
                            <input type="text" className="input input-m w-full" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="flex gap-3">
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
                </div >
            </dialog >
        </>
    );
};

export default AddTrip;
