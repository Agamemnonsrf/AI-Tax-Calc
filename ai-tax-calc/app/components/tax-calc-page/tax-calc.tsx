import React, { useState } from "react";
import { CombinedForm } from "./combined-form";
import Tooltip from "../ui-components/tooltip";

const TaxCalculator: React.FC = () => {

    return (
        <main className="h-svh bg-black">
            <div className="space-y-10 px-0 py-5 md:p-5 flex flex-col">
                <div className="mt-16 md:mt-5"></div>
                <h2 className="text-4xl mx-2 md:mx-0 md:text-6xl font-extrabold text-white">Tax Calculator</h2>
                <Tooltip text="Input your info in the forms below to calculate your tax as an employee or a business owner." size="sm" />
                <CombinedForm isBusinessForm={false} />
                <CombinedForm isBusinessForm={true} />
            </div>
        </main>
    )
};

export default TaxCalculator;