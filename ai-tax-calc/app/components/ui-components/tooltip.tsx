import React from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface TooltipProps {
    text: string;
    secondaryText?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: IconDefinition;
}

const Tooltip: React.FC<TooltipProps> = ({ text, secondaryText, size = "lg", icon = faAsterisk }) => {
    return (
        <div className={`flex items-center gap-3 self-center border border-purple-400 bg-purple-600 bg-opacity-50 p-3 pr-4 mx-3 md:mx-0 rounded-md md:rounded-full text-${size}`}>
            <div className="flex flex-col items-center justify-center h-full select-none">
                <FontAwesomeIcon icon={icon} className={`text-${size} text-purple-200`} />
            </div>
            <div className="flex flex-col">
                <h3 className={`text-${size} font-light md:text-md text-purple-200`}>
                    {text}
                </h3>
                {secondaryText && (
                    <h3 className={`text-${size} font-light md:text-md text-purple-400`}>
                        {secondaryText}
                    </h3>
                )}
            </div>
        </div>
    );
};

export default Tooltip;