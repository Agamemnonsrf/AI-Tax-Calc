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