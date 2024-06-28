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
                    <div className="stat-value">${expenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0).toFixed(0)}</div>
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
                <div className="mt-4 w-full mb-9">
                    <h2 className="text-xl mb-3">Add New</h2>
                    <input
                        type="text"
                        placeholder="What did you pay for?"
                        value={newExpense.name}
                        onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                        className="input input-bordered mb-2 w-full"
                    />                    
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        className="input input-bordered mb-3 w-full"
                    />
                    <button className="btn btn-sm btn-outline btn-accent" onClick={handleAddExpense}>Add Expense</button>
                    {error && <p className="text-red-500 my-3">{error}</p>}
                </div>

                <div className="overflow-x-auto">
                    <h3 className="text-xl mb-3">All Expenses</h3>
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Expense</th>
                                <th>Price</th>
                                <th>Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.length > 0 ? (
                                expenses.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{expense.name}</td>
                                        <td>${parseFloat(expense.amount).toFixed(2)}</td>
                                        <td>Owner</td>
                                    </tr>
                                ))
                            ) : (
                                <p>No expenses added yet.</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </>
    );
};

export default ExpensesWidget;
