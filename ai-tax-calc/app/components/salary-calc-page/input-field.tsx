import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    value: number;
    step?: string;
    max?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function formatNumberWithDots(numStr: string): string {
    let result = "";
    let counter = 0;

    for (let i = numStr.length - 1; i >= 0; i--) {
        result = numStr[i] + result;
        counter++;

        if (counter % 3 === 0 && i !== 0) {
            result = "." + result;
        }
    }

    return result;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, step = 1, max, onChange }) => {
    return (
        <div className='flex flex-col'>
            <label
                htmlFor={name}
            >
                {label}
            </label>
            <input
                min='0'
                max={max}
                placeholder='0'
                step={step}
                className='w-1/2 p-2 mt-1 border border-gray-300 rounded-md'
                name={name}
                value={formatNumberWithDots(value.toString())}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;