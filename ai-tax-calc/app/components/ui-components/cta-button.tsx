import React from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPieChart, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface CtaButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: IconDefinition;
}

const CtaButton: React.FC<CtaButtonProps> = ({ text, onClick, buttonType, size = "lg", icon = faPieChart }) => {
    return (
        <button type={buttonType} onClick={onClick} className="flex items-center justify-center px-4 py-2 border-2 border-transparent rounded-md bg-black text-white transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(155,121,227,1)]">
            <span className={`mr-2 text-${size} text-center`}>{text}</span>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

export default CtaButton;