import React from 'react';
import GotoButton from '../ui-components/goto-button';
import CtaButton from '../ui-components/cta-button';

interface UserStatusBoxProps {
    isLoggedIn: boolean;
    username?: string;
}

const UserStatusBox: React.FC<UserStatusBoxProps> = ({ isLoggedIn, username }) => {

    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-5 text-xs">
                <p className=' border border-purple-400 p-2 rounded-lg bg-purple-600 bg-opacity-50'>Signed in as {username}</p>
                <CtaButton text="Log Out" onClick={() => { }} />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-5 text-xs">
            <p className=' border border-slate-500 p-2 rounded-lg bg-slate-600 bg-opacity-50'>Guest Mode</p>
            <GotoButton text="Sign In" link="sign-in" size='xs' />
        </div>
    );
};

export default UserStatusBox;