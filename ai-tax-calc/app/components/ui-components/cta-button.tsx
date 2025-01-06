import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPieChart, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface CtaButtonProps {
    text: string;
    buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: IconDefinition;
    widthType?: 'auto' | 'full' | 'custom';
    isDestructive?: boolean;
    isInvertColor?: boolean;
    disabled?: boolean;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const CtaButton: React.FC<CtaButtonProps> = ({ text, buttonType, size = "lg", icon = faPieChart, widthType = 'auto', onClick, isDestructive = false, isInvertColor = false, disabled = false }) => {

    const decideColor = () => {
        if (disabled) {
            return "bg-gray-300 text-gray-500";
        }
        if (isDestructive) {
            return "bg-red-600 text-white";
        }
        if (isInvertColor) {
            return "bg-white text-black";
        }
        return "bg-black text-white";
    }

    const color = decideColor();

    if (widthType === 'custom') {
        return (
            <button disabled={disabled} onClick={onClick} type={buttonType} className={`w-full h-full items-center justify-center px-4 py-2 border-2 border-transparent ${color} transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(155,121,227,1)] text-${size}`}>
                <span className="mr-2 text-center">{text}</span>
                <FontAwesomeIcon icon={icon} />
            </button>
        );
    }

    if (widthType === 'full') {
        return (
            <button disabled={disabled} onClick={onClick} type={buttonType} className={`w-full flex items-center justify-center px-4 py-2 border-2 border-transparent ${color} transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(155,121,227,1)] text-${size}`}>
                <span className="mr-2 text-center">{text}</span>
                <FontAwesomeIcon icon={icon} />
            </button>
        );
    }

    return (
        <button disabled={disabled} onClick={onClick} type={buttonType} className={`flex w-fit items-center justify-center px-4 py-2 border-2 border-transparent rounded-md ${color} transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(155,121,227,1)] text-${size}`}>
            <span className="mr-2 text-center">{text}</span>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

export default CtaButton;