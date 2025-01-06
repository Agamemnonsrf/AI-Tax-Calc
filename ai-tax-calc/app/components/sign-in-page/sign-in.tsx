import React, { useState } from "react";
import SignInForm from "./sign-in-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faExplosion, faStarOfLife, faUser } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../ui-components/tooltip";


const SignIn: React.FC = () => {

    return (
        <main className="h-svh bg-black">
            <div className="space-y-10 p-5 flex flex-col">
                <div className="mt-5"></div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Sign in</h2>
                <Tooltip text="Create an account or sign in to save your sessions with our Tax Advisor." size="sm" />
                <SignInForm />
            </div>
        </main>
    )
};

export default SignIn;