import React, { useState } from "react";
import InputField from "./input-field";


type TaxFormData = {
    grossMonth: number;
    numOfSalaries: number;
    taxRate: number;
};

type TaxResultData = {
    grossYear: number;
    tax: number;
    netYear: number;
    netMonth: number;
};

export const SalaryForm = () => {
    const [formData, setFormData] = useState<TaxFormData>({
        grossMonth: 0,
        numOfSalaries: 0,
        taxRate: 0,
    });

    const [resultData, setResultData] = useState<TaxResultData>({
        grossYear: 0,
        tax: 0,
        netYear: 0,
        netMonth: 0,
    });




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.value: " + e.target.value);
        const rawValue = e.target.value.replaceAll(".", "");
        console.log("raw", rawValue);
        console.log("parseInt", parseInt(rawValue));

        if (rawValue === "") {
            console.log("empty");
            setFormData({
                ...formData,
                [e.target.name]: rawValue,
            });
        }

        if (!/^\d+$/.test(rawValue)) {
            console.log("Not a number");
            return;
        }

        if (rawValue[0] === "0" && rawValue.length > 1) {
            console.log("leading zero, setting to: " + rawValue.slice(1));
            setFormData({
                ...formData,
                [e.target.name]: rawValue.slice(1),
            });
            return;
        }

        setFormData({
            ...formData,
            [e.target.name]: rawValue,
        });
    };

    const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(".", "");
        if (parseInt(rawValue) > 100) {
            setFormData({
                ...formData,
                [e.target.name]: 100,
            });
            return;
        }
        handleChange(e);
    }

    const calculateTax = async (e:
        React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            const result = await fetch("http://localhost:5000/calculate-tax", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await result.json();
            setResultData(data);
            console.log("API call successful with resultData:", data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="flex flex-col gap-4 p-5 bg-slate-600 rounded-xl">
            <div>
                <InputField
                    label="Gross monthly salary:"
                    value={formData.grossMonth}
                    onChange={handleChange}
                    name={"grossMonth"}
                    step="10"
                />
            </div>
            <div>
                <InputField
                    label="Number of salaries per year:"
                    value={formData.numOfSalaries}
                    onChange={handleChange}
                    name={"numOfSalaries"}
                />
            </div>
            <div>
                <InputField
                    label="Tax rate:"
                    value={formData.taxRate}
                    onChange={handleTaxChange}
                    name={"taxRate"}
                    max="100"
                />
            </div>
            <button type="submit" className="p-2 bg-white text-black" onClick={calculateTax}>Calculate</button>

            <div>
                <p>Gross yearly salary: {resultData.grossYear}</p>
                <p>Tax: {resultData.tax}</p>
                <p>Net yearly salary: {resultData.netYear}</p>
                <p>Net monthly salary: {resultData.netMonth}</p>
            </div>
        </form>
    )
}