import React from "react";
import GotoButton from "./ui-components/goto-button";
import { Link } from "react-router";

export const Welcome = () => {
    return (
        <main
            className="flex items-center justify-center h-screen text-white"
            style={{
                backgroundImage: "radial-gradient(ellipse at bottom, rgba(128,90,213,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)",
            }}
        >
            <div className="text-center space-y-10">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                    Welcome to{" "}
                    <span className="text-purple-400">AI Tax Calculator</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300">
                    Your personal {" "}
                    <Link to="tax-advisor"><span className="text-purple-500">Tax Advisor</span></Link>
                    {" "} and {""}
                    <Link to="calculate-tax"><span className="text-purple-500">Tax Calculation Tool</span></Link>
                    {" "} for employees and business owners
                </p>

                <div className="flex justify-around">
                    <GotoButton
                        text="Get tax advice"
                        link="tax-advisor"
                    />
                    <GotoButton
                        text="Calculate your tax"
                        link="calculate-tax"
                    />
                </div>
            </div>
        </main>
    );
};