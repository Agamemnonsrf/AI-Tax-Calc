import React from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface GotoButtonProps {
    text: string;
    link: string;
}

const GotoButton: React.FC<GotoButtonProps> = ({ text, link }) => {
    return (
        <Link to={link} className="flex items-center space-x-2">
            <button className="flex items-center px-4 py-2 border-2 border-transparent rounded-md bg-white text-black transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(155,121,227,1)]">
                <span className="mr-2 text-lg">{text}</span>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </Link>
    );
};

export default GotoButton;