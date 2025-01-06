import React from 'react';
import CtaButton from './cta-button';
import { faTrash, faX } from '@fortawesome/free-solid-svg-icons';

interface DialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onCancel, onConfirm, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <div className="p-4 flex flex-col items-center w-full">
                    <h2 className="text-lg text-black">{title}</h2>
                    <div className="flex justify-around mt-4 w-full">
                        <CtaButton text="Delete" onClick={() => {
                            onConfirm();
                            onCancel();
                        }} size="sm" isDestructive icon={faTrash} />
                        <CtaButton text="Cancel" onClick={onCancel} size="sm" icon={faX} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;