import React from 'react';
import CtaButton from '../ui-components/cta-button';

const SignInForm: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row w-2/3 self-center bg-white rounded-lg">
            <div className="flex-1 flex flex-col justify-between items-center bg-gray-100 rounded-s-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-black self-start justify-self-start">Sign In</h2>
                <form className="w-full max-w-sm h-full justify-between flex flex-col">
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="********"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <CtaButton text="Sign In" onClick={() => { }} />
                    </div>
                </form>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-black self-start">Sign Up</h2>
                <form className="w-full max-w-sm">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="new-username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="new-password"
                            type="password"
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirm-password"
                            type="password"
                            placeholder="********"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <CtaButton text="Sign Up" onClick={() => { }} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;