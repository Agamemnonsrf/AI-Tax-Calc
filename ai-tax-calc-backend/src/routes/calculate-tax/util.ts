export type TaxFormData = {
    grossMonth: number;
    numOfSalaries: number;
    taxRate: number;
};

export type TaxResultData = {
    grossYear: number;
    tax: number;
    netYear: number;
    netMonth: number;
};

export interface BusinessTaxFormData {
    grossRevenue: number;
    businessExpenses: number
    taxRate: number;
}

export interface BusinessTaxResultData {
    taxableIncome: number;
    tax: number;
    netIncome: number;
}

export const calculateTax = (data: TaxFormData): TaxResultData => {
    const { grossMonth, numOfSalaries, taxRate } = data;
    const grossYear = grossMonth * numOfSalaries;
    const tax = grossYear * (taxRate / 100);
    const netYear = grossYear - tax;
    const netMonth = netYear / numOfSalaries;
    return { grossYear, tax, netYear, netMonth };
}

const roundToTwo = (num: number) => Math.round(num * 100) / 100;

export const calculateBusinessTax = (data: BusinessTaxFormData): BusinessTaxResultData => {
    const { grossRevenue, businessExpenses, taxRate } = data;

    const grossRevenueRounded = roundToTwo(grossRevenue);
    const businessExpensesRounded = roundToTwo(businessExpenses);
    const taxRateRounded = roundToTwo(taxRate);
    const taxableIncome = grossRevenueRounded - businessExpensesRounded;
    const adjustedTaxableIncome = Math.max(taxableIncome, 0);
    const tax = adjustedTaxableIncome * (taxRateRounded / 100);
    const netIncome = adjustedTaxableIncome - tax;

    return { taxableIncome, tax, netIncome };
}