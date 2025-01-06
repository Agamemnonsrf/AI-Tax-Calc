import React from 'react';
import GotoButton from '../ui-components/goto-button';
import CtaButton from '../ui-components/cta-button';
import { useAuthContext } from '../../context/AuthContext';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const UserStatusBox: React.FC = () => {
    const { isLoggedIn, username, signOut } = useAuthContext();
    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-5 text-xs">
                <p className=' border border-purple-400 p-2 rounded-lg bg-purple-600 text-white bg-opacity-50'>Signed in as <span className='font-bold'>{username}</span></p>
                <CtaButton text="Log Out" onClick={signOut} size='xs' icon={faDoorOpen} />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-5 text-xs">
            <p className=' border border-slate-500 text-white p-2 rounded-lg bg-slate-600 bg-opacity-50'>Guest Mode</p>
            <GotoButton text="Sign In" link="sign-in" size='xs' />
        </div>
    );
};

export default UserStatusBox;