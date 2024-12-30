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

export const calculateTax = (data: TaxFormData): TaxResultData => {
    const { grossMonth, numOfSalaries, taxRate } = data;
    const grossYear = grossMonth * numOfSalaries;
    const tax = grossYear * (taxRate / 100);
    const netYear = grossYear - tax;
    const netMonth = netYear / numOfSalaries;
    return { grossYear, tax, netYear, netMonth };
}