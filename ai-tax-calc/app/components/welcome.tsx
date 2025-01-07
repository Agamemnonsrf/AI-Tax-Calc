import React, { useEffect } from "react";
import GotoButton from "./ui-components/goto-button";
import { Link } from "react-router";
import { useIsMobile } from "../hooks/useIsMobile";

export const Welcome = () => {
    const isMobile = useIsMobile();
    return (
        <main
            className="flex items-center justify-center h-svh text-white"
            style={{
                backgroundImage: isMobile
                    ? "linear-gradient(to top, rgba(128,90,213,1) 0%,  rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)"
                    : "radial-gradient(ellipse at bottom, rgba(128,90,213,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)",
            }}
        >
            <div className="text-center space-y-10">
                <h1 className="text-3xl px-2 md:text-6xl font-extrabold text-white">
                    Welcome to{" "}
                    <span className="text-purple-400">AI Tax Calculator</span>
                </h1>

                <p className="text-lg md:text-xl px-3 text-gray-300">
                    Your personal {" "}
                    <Link to="tax-advisor"><span className="text-purple-500">Tax Advisor</span></Link>
                    {" "} and {""}
                    <Link to="calculate-tax"><span className="text-purple-500">Tax Calculation Tool</span></Link>
                    {" "} for employees and business owners
                </p>

                <div className="flex flex-col gap-3 justify-center items-center md:gap-0 md:flex-row md:justify-around">
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