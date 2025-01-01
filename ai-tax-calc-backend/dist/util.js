"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTax = void 0;
const calculateTax = (data) => {
    const { grossMonth, numOfSalaries, taxRate } = data;
    const grossYear = grossMonth * numOfSalaries;
    const tax = grossYear * (taxRate / 100);
    const netYear = grossYear - tax;
    const netMonth = netYear / numOfSalaries;
    return { grossYear, tax, netYear, netMonth };
};
exports.calculateTax = calculateTax;
