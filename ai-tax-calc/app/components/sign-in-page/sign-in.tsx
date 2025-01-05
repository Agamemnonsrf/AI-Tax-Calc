import React, { useState } from "react";
import SignInForm from "./sign-in-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faExplosion, faStarOfLife, faUser } from "@fortawesome/free-solid-svg-icons";


const SignIn: React.FC = () => {

    return (
        <main className="h-svh bg-black">
            <div className="space-y-10 p-5 flex flex-col">
                <div className="mt-5"></div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Sign in</h2>
                <div className="flex items-center gap-3 self-center border border-purple-400 bg-purple-600 bg-opacity-50 p-3 rounded-full">
                    <FontAwesomeIcon icon={faAsterisk} className="text-xs text-purple-200" />
                    <h3 className="text-sm font-light md:text-md text-purple-200 text-nowrap">
                        Create an account or sign in to save your sessions with our Tax Advisor.
                    </h3>
                </div>
                <SignInForm />
            </div>
        </main>
    )
};

export default SignIn;