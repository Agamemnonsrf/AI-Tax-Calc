import { Link } from "react-router";
import React from "react";

export const Welcome = () => {
    return (
        <main className="flex items-center justify-center pt-16 pb-4 bg-gray-50 h-svh dark:bg-gray-900 text-black dark:text-white">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <header className="flex flex-col items-center gap-9">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Welcome to AI Tax Calculator</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Your personal tax assistant</p>
                </header>
                <div className="max-w-[300px] w-full space-y-6 px-4">
                    <nav className="">
                        <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                            What&apos;s next?
                        </p>
                        <Link to="calculate-tax">
                            <button className="p-3 bg-black text-white rounded-md m-2">
                                Calculate your taxes
                            </button>
                        </Link>
                        <Link to="tax-advisor">
                            <button className="p-3 bg-black text-white rounded-md m-2">
                                Consult our trained AI Tax Assistant
                            </button>
                        </Link>
                    </nav>
                </div>
            </div>
        </main>
    );
}
