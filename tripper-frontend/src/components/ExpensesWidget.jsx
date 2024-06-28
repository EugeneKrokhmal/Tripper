import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';

const ExpensesWidget = ({ expenses, tripId, onUpdateExpenses }) => {
    const [showModal, setShowModal] = useState(false);
    const [newExpense, setNewExpense] = useState({ name: '', amount: '' });
    const [error, setError] = useState(null);

    const handleAddExpense = async () => {
        // Validate input
        if (newExpense.name === '' || newExpense.amount === '') {
            setError('Invalid expense data');
            return;
        }

        // Prepare expense data
        const expenseToAdd = {
            name: newExpense.name,
            amount: parseFloat(newExpense.amount)
        };

        try {
            // Send POST request to backend API to add expense
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/trips/${tripId}/expenses`, expenseToAdd);
            
            // Update expenses in UI or state after successful addition
            onUpdateExpenses(response.data.expenses);
            
            // Reset form and close modal
            setNewExpense({ name: '', amount: '' });
            setShowModal(false);
            setError(null);
        } catch (error) {
            // Handle error responses
            if (error.response && error.response.data) {
                console.error('Error adding expense:', error.response.data);
                setError(error.response.data.message || 'Failed to add expense');
            } else {
                console.error('Error adding expense:', error.message);
                setError('Failed to add expense');
            }
        }
    };

    return (
        <>
            <div className="stats bg-primary text-primary-content flex flex-1">
                <div className="stat">
                    <div className="stat-title">Trip total</div>
                    <div className="stat-value">${expenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0).toFixed(2)}</div>
                    <div className="stat-actions">
                        <button className="btn btn-sm btn-success" onClick={() => setShowModal(true)}>All Expenses</button>
                    </div>
                </div>

                {/* Placeholder for user's paid amount */}
                <div className="stat">
                    <div className="stat-title">You paid</div>
                    <div className="stat-value">$400</div>
                    <div className="stat-actions">
                        <button className="btn btn-sm">Yours</button>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ul>
                    {expenses.length > 0 ? (
                        expenses.map((expense, index) => (
                            <li key={index} className="mb-2">
                                {expense.name}: ${parseFloat(expense.amount).toFixed(2)}
                            </li>
                        ))
                    ) : (
                        <p>No expenses added yet.</p>
                    )}
                </ul>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-4 w-full">
                    <h3 className="text-xl mb-2">Add New Expense</h3>
                    <input
                        type="text"
                        placeholder="Description"
                        value={newExpense.name}
                        onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                        className="input input-bordered mb-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        className="input input-bordered mb-2 w-full"
                    />
                </div>
                <button className="btn btn-primary" onClick={handleAddExpense}>Add</button>
            </Modal>
        </>
    );
};

export default ExpensesWidget;
