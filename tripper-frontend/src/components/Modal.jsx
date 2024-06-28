import React from 'react';

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full h-screen">
                <div className="flex justify-end">
                    <button className="btn btn-sm btn-outline" onClick={onClose}>Close</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
