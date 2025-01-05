import React, { useState } from "react";

import CtaButton from "../ui-components/cta-button";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
import type { DefaultizedPieValueType } from "@mui/x-charts";
import type { BusinessTaxFormData, BusinessTaxResultData, CombinedFormProps, SalaryTaxFormData, SalaryTaxResultData } from "~/types";
import InputField from "./input-field";



export const CombinedForm = ({ isBusinessForm }: CombinedFormProps) => {
    const [formData, setFormData] = useState<BusinessTaxFormData | SalaryTaxFormData>(
        isBusinessForm
            ? { grossRevenue: 0, businessExpenses: 0, taxRate: 0 }
            : { grossMonth: 0, numOfSalaries: 0, taxRate: 0 }
    );

    const [resultData, setResultData] = useState<BusinessTaxResultData | SalaryTaxResultData>(
        isBusinessForm
            ? { taxableIncome: 0, tax: 0, netIncome: 0 }
            : { grossYear: 0, tax: 0, netYear: 0, netMonth: 0 }
    );

    const [error, setError] = useState<string | null>(null);

    const resultsExist = () => {
        if (isBusinessForm) {
            return (resultData as BusinessTaxResultData).netIncome !== 0;
        }
        return (resultData as SalaryTaxResultData).netYear !== 0;
    }

    const getTotal = () => {
        if (isBusinessForm) {
            const results: BusinessTaxResultData = resultData as BusinessTaxResultData;
            const form: BusinessTaxFormData = formData as BusinessTaxFormData;
            console.log(results.tax, results.netIncome, form.businessExpenses);
            return results.tax + results.netIncome + form.businessExpenses;
        }
        return (resultData as SalaryTaxResultData).tax + (resultData as SalaryTaxResultData).netYear;
    }

    const getArcLabel = (params: DefaultizedPieValueType): any => {
        const total = getTotal();
        const percent = params.value / total;
        if (percent === 0) return null; // Hide label for 0 values
        const value = params.value.toLocaleString() + "€";
        const percentage = `${(percent * 100).toFixed(0)}%`;

        return (
            <tspan>
                {value}
                <tspan x="0" dy="1.2em">{percentage}</tspan>
            </tspan>
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        if (rawValue === "") {
            setFormData({
                ...formData,
                [e.target.name]: rawValue,
            });
            return;
        }

        if (!/^\d*\.?\d*$/.test(rawValue)) {
            return;
        }

        let parsedValue: number | string = rawValue;
        if (rawValue[0] === "0" && rawValue.length > 1) {
            parsedValue = rawValue.slice(1);
        }

        if (!isNaN(Number(parsedValue))) {
            parsedValue = Number(parsedValue);
        }

        setFormData({
            ...formData,
            [e.target.name]: parsedValue,
        });
    };

    const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        if (parseInt(rawValue) > 100) {
            setFormData({
                ...formData,
                [e.target.name]: 100,
            });
            return;
        }
        handleChange(e);
    }

    const calculateTax = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await fetch(
                isBusinessForm ? "http://localhost:5000/calculate-tax/business-tax" : "http://localhost:5000/calculate-tax/salary-tax",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (!result.ok) {
                throw new Error("Failed to calculate tax");
            }
            const data = await result.json();
            setResultData(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="flex flex-col h-full gap-10 p-5 bg-white rounded-xl w-2/3 self-center">
            <div className="gap-4 flex flex-col">
                <h3 className="text-2xl md:text-xl font-bold text-gray-900">
                    {isBusinessForm ? "For Business Owners" : "For Salaried Employees"}
                </h3>
                <hr className="border border-black" />
                {error && (
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        {error}
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center justify-between gap-5">
                        {isBusinessForm ? (
                            <>
                                <InputField
                                    label="Gross Revenue:"
                                    value={(formData as BusinessTaxFormData).grossRevenue}
                                    onChange={handleChange}
                                    setFormData={setFormData}
                                    name={"grossRevenue"}
                                    step="10"
                                    suffix="€"
                                />
                                <InputField
                                    label="Business Expenses:"
                                    value={(formData as BusinessTaxFormData).businessExpenses}
                                    onChange={handleChange}
                                    setFormData={setFormData}
                                    name={"businessExpenses"}
                                    step="10"
                                    suffix="€"
                                />
                                <InputField
                                    label="Tax rate:"
                                    value={(formData as BusinessTaxFormData).taxRate}
                                    onChange={handleTaxChange}
                                    setFormData={setFormData}
                                    name={"taxRate"}
                                    max="100"
                                    suffix="%"
                                />
                                <div className="mt-4 p-2 bg-gray-100 rounded-md text-gray-700">
                                    <span className="font-semibold">Taxable Income: </span>
                                    {(resultData as BusinessTaxResultData).taxableIncome.toLocaleString()}€
                                </div>
                            </>
                        ) : (
                            <>
                                <InputField
                                    label="Gross monthly salary:"
                                    value={(formData as SalaryTaxFormData).grossMonth}
                                    onChange={handleChange}
                                    setFormData={setFormData}
                                    name={"grossMonth"}
                                    step="10"
                                    suffix="€"
                                />
                                <InputField
                                    label="Amount of yearly salaries:"
                                    value={(formData as SalaryTaxFormData).numOfSalaries}
                                    onChange={handleChange}
                                    setFormData={setFormData}
                                    name={"numOfSalaries"}
                                    step="0.5"
                                />
                                <InputField
                                    label="Tax rate:"
                                    value={(formData as SalaryTaxFormData).taxRate}
                                    onChange={handleTaxChange}
                                    setFormData={setFormData}
                                    name={"taxRate"}
                                    max="100"
                                    suffix="%"
                                />
                                <div className="mt-4 p-2 bg-gray-100 rounded-md text-gray-700">
                                    <span className="font-semibold">Net Monthly Salary: </span>
                                    {(resultData as SalaryTaxResultData).netMonth.toLocaleString()}€
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex">
                        <PieChart
                            series={[
                                {
                                    innerRadius: 10,
                                    outerRadius: 100,
                                    cornerRadius: 5,
                                    highlightScope: { fade: 'series', highlight: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    data: resultsExist()
                                        ? isBusinessForm
                                            ? [
                                                { label: 'Amount Taxed', value: (resultData as BusinessTaxResultData).tax },
                                                { label: 'Net Income', value: (resultData as BusinessTaxResultData).netIncome },
                                                { label: 'Business Expenses', value: (formData as BusinessTaxFormData).businessExpenses },
                                            ]
                                            : [
                                                { label: 'Amount Taxed', value: (resultData as SalaryTaxResultData).tax },
                                                { label: 'Net yearly salary', value: (resultData as SalaryTaxResultData).netYear },
                                            ]
                                        : [
                                            { label: '', value: 100 },
                                        ],
                                    arcLabel(item) {
                                        if (resultsExist()) {
                                            const percent = item.value / getTotal();
                                            if (percent < 0.05) return null; // Hide label for very small percentages
                                            return getArcLabel(item);
                                        }
                                        return null;
                                    },
                                }
                            ]}
                            colors={resultsExist() ? ['#f44336', '#4caf50', '#2196f3', '#ffeb3b'] : ['#f0f0f0']}
                            width={500}
                            height={200}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 14,
                                },
                            }}
                            slotProps={{
                                legend: { hidden: resultsExist() ? false : true },
                            }}
                            tooltip={{
                                trigger: resultsExist() ? "item" : "none",
                            }}
                        />
                    </div>
                </div>
            </div>
            <CtaButton onClick={calculateTax} text="Calculate" buttonType="submit" />
        </div>
    );
};
