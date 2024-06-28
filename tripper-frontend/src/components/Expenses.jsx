import React, { useState } from 'react';
import AddExpensePopup from './AddExpensePopup';

const Expenses = ({ tripId, fetchTrip }) => {
    const [showAddExpense, setShowAddExpense] = useState(false);

    const handleAddExpense = () => {
        setShowAddExpense(true);
    };

    const handleCloseAddExpense = () => {
        setShowAddExpense(false);
        fetchTrip(); // Refresh trip details to include the new expense
    };

    return (
        <div className="stats bg-primary text-primary-content">
            <div className="stat">
                <div className="stat-title">Trip total</div>
                <div className="stat-value">$1,400</div>
                <div className="stat-actions">
                    <button className="btn btn-sm btn-success">All</button>
                </div>
            </div>
            <div className="stat">
                <div className="stat-title">You payed</div>
                <div className="stat-value">$400</div>
                <div className="stat-actions">
                    <button className="btn btn-sm" onClick={handleAddExpense}>Yours</button>
                </div>
            </div>
            <AddExpensePopup tripId={tripId} onClose={handleCloseAddExpense} />
            {showAddExpense && (
                <AddExpensePopup tripId={tripId} onClose={handleCloseAddExpense} />
            )}
        </div>
    );
};

export default Expenses;
