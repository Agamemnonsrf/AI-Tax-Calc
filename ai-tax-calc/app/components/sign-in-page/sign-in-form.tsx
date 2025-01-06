import React, { useState } from 'react';
import CtaButton from '../ui-components/cta-button';
import { useAuthContext } from '../../context/AuthContext';
import { Form, useNavigate } from 'react-router';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

const SignInForm: React.FC = () => {
    const { signIn: authSignIn } = useAuthContext();
    const [signInData, setSignInData] = useState({ usernameSignIn: '', passwordSignIn: '' });
    const [signUpData, setSignUpData] = useState({ usernameSignUp: '', passwordSignUp: '', confirmPassword: '' });
    const [signUpError, setSignUpError] = useState('');
    const [signInError, setSignInError] = useState('');
    const navigate = useNavigate();

    const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignInData({ ...signInData, [e.target.id]: e.target.value });
    };

    const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
    };

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSignInError('');
        try {
            const response = await fetch('http://localhost:5000/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signInData),
            });
            if (!response.ok) {
                throw new Error('Sign in failed');
            }
            const data = await response.json();
            authSignIn(data.token, signInData.usernameSignIn);
            navigate('/');
            console.log('Sign in successful', data);
        } catch (error) {
            setSignInError('Sign in failed. Please try again.');
            console.error('Sign in error', error);
        }
    };

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (signUpData.passwordSignUp !== signUpData.confirmPassword) {
            setSignUpError('Passwords do not match');
            return;
        }
        setSignUpError('');
        try {
            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signUpData),
            });
            if (!response.ok) {
                throw new Error('Sign up failed');
            }
            const data = await response.json();
            authSignIn(data.token, signUpData.usernameSignUp);
            navigate('/');
            console.log('Sign up successful', data);
        } catch (error) {
            setSignUpError('Sign up failed. Please try again.');
            console.error('Sign up error', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full md:w-2/3 self-center bg-white rounded-lg">
            <div className="flex-1 flex flex-col justify-between items-center bg-gray-100 rounded-lg md:rounded-s-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-black self-start justify-self-start">Sign In</h2>
                <Form className="w-full max-w-sm h-full justify-between flex flex-col" onSubmit={signIn}>
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow bg-black appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="usernameSignIn"
                                type="text"
                                placeholder="Username"
                                required
                                value={signInData.usernameSignIn}
                                onChange={handleSignInChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordSignIn">
                                Password
                            </label>
                            <input
                                className="shadow bg-black appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="passwordSignIn"
                                type="password"
                                placeholder="********"
                                required
                                value={signInData.passwordSignIn}
                                onChange={handleSignInChange}
                            />
                        </div>
                    </div>
                    {signInError && <p className="text-red-500 text-xs italic">{signInError}</p>}
                    <div className="flex items-center justify-between">
                        <CtaButton buttonType='submit' text="Sign In" icon={faKey} size={"md"} />
                    </div>
                </Form>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-black self-start">Sign Up</h2>
                <Form className="w-full max-w-sm" onSubmit={signUp}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-username">
                            Username
                        </label>
                        <input
                            className="shadow bg-black appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Username"
                            required
                            id="usernameSignUp"
                            value={signUpData.usernameSignUp}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                            Password
                        </label>
                        <input
                            className="shadow bg-black appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="********"
                            required
                            id="passwordSignUp"
                            value={signUpData.passwordSignUp}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            className="shadow bg-black appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="********"
                            required
                            id="confirmPassword"
                            value={signUpData.confirmPassword}
                            onChange={handleSignUpChange}
                        />
                        {signUpError && <p className="text-red-500 text-xs italic">{signUpError}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <CtaButton buttonType='submit' text="Sign Up" icon={faUser} size={"md"} />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignInForm;