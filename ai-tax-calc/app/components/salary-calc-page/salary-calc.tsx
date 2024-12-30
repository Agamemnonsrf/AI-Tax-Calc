import React, { useState } from "react";
import InputField from "./input-field";
import { SalaryForm } from "./salary-form";

type TaxFormData = {
    grossMonth: number;
    numOfSalaries: number;
    taxRate: number;
};

const SalaryCalculator: React.FC = () => {


    return (
        <div className="h-svh bg-slate-950 flex items-center flex-col justify-center text-white">
            <h1>Salary Calculator</h1>
            <SalaryForm />
            <button className="p-2 bg-white text-black" onClick={() => {
                fetch('http://localhost:5000/')
                    .then(response => {
                        console.log(response);
                        return response.text()
                    })
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => console.log(err));
            }}>get api</button>
        </div>
    )
};

export default SalaryCalculator;