import React from 'react';

const Modal = ({ open, onClose, children }) => {
    return (
        <dialog className="modal bg-base-200 bg-opacity-60" open={open}>
            <div className="modal-box">
                <div className="flex justify-end mb-6">
                    <button className="btn btn-sm btn-circle btn-outline" onClick={onClose}>
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
                <div>{children}</div>
            </div>
        </dialog>
    );
};

export default Modal;
