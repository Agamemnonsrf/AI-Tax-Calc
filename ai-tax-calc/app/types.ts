export interface CombinedFormProps {
    isBusinessForm: boolean;
}

export interface BusinessTaxFormData {
    grossRevenue: number;
    businessExpenses: number;
    taxRate: number;
}

export interface BusinessTaxResultData {
    taxableIncome: number;
    tax: number;
    netIncome: number;
}

export interface SalaryTaxFormData {
    grossMonth: number;
    numOfSalaries: number;
    taxRate: number;
}

export interface SalaryTaxResultData {
    grossYear: number;
    tax: number;
    netYear: number;
    netMonth: number;
}
