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
                description
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
            <div className="flex justify-center">
                <button className="btn btn-xs btn-lg btn-primary  my-6" onClick={openModal}>Let's Go!</button>
            </div>
            <dialog id="addTripModal" className="modal">
                <div className="modal-box">
                    <strong className="text-2xl font-bold">Add Trip</strong>
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
                            <button type="submit" className="btn btn-primary">Yalla!</button>
                            <button type="button" className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default AddTrip;
