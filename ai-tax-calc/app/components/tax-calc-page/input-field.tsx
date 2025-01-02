import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import type { BusinessTaxFormData, SalaryTaxFormData } from '~/types';

interface InputFieldProps {
    label: string;
    name: string;
    value: number;
    step?: string;
    max?: string;
    suffix?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<BusinessTaxFormData | SalaryTaxFormData>>
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, step = 1, max, suffix, onChange, setFormData }) => {
    const handleIncrement = () => {
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value + Number(step)
            };
        })
    };

    const handleDecrement = () => {
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value - Number(step)
            };
        })
    };

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <label
                    htmlFor={name}
                    className='text-sm font-semibold text-gray-700'
                >
                    {label}
                </label>
                <div className='flex ml-2 space-x-1'>
                    <button type='button' onClick={handleDecrement} className='text-gray-200 bg-gray-700 rounded-sm w-4 h-4 flex items-center justify-center'>
                        <FontAwesomeIcon icon={faMinus} size="xs" />
                    </button>
                    <button type='button' onClick={handleIncrement} className='text-gray-200 bg-gray-700 rounded-sm w-4 h-4 flex items-center justify-center'>
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                    </button>
                </div>
            </div>
            <div className='relative'>
                <input
                    min='0'
                    max={max}
                    placeholder='0'
                    step={step}
                    className='p-2 mt-1 border border-gray-300 rounded-md pr-8'
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {suffix && (
                    <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 select-none'>
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputField;