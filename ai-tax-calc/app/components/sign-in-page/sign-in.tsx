import React, { useState } from "react";
import SignInForm from "./sign-in-form";


const SignIn: React.FC = () => {

    return (
        <main className="h-svh bg-black">
            <div className="space-y-10 p-5 flex flex-col">
                <div className="mt-5"></div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Sign in</h2>
                <h3 className="text-lg md:text-xl text-gray-300 self-center">
                    Create an account or sign in to save your sessions with our Tax Advisor.
                </h3>
                <SignInForm />
            </div>
        </main>
    )
};

export default SignIn;