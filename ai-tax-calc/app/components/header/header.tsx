import React from 'react';
import GotoButton from '../ui-components/goto-button';
import { Link } from 'react-router';
import UserStatusBox from './user-status-box';

const Header: React.FC = () => {
    return (
        <header className="flex justify-around items-center p-4 bg-gray-900 absolute w-full">
            <Link to="/" >
                <div className="text-xl font-bold transition-all duration-250 hover:[text-shadow:_0_2px_20px_#a855f7]">
                    <span className='text-purple-500'>AI</span>
                    Tax
                    <span className='text-purple-500'>Calc</span>
                </div>
            </Link>
            <div className='flex items-center space-x-4'>
                <UserStatusBox isLoggedIn={false} />
            </div>
        </header>
    );
};

export default Header;
