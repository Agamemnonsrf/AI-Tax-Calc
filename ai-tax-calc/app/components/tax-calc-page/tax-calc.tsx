import React, { useState } from "react";
import { CombinedForm } from "./combined-form";

const TaxCalculator: React.FC = () => {

    return (
        <main className="h-svh bg-black">
            <div className="space-y-10 p-5 flex flex-col">
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Tax Calculator</h2>
                <h3 className="text-lg md:text-xl text-gray-300 self-center">
                    Enter your details to get your tax analysis
                </h3>
                <CombinedForm isBusinessForm={false} />
                <CombinedForm isBusinessForm={true} />
            </div>
        </main>
    )
};

export default TaxCalculator;