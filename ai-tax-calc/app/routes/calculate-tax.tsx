import type { Route } from "./+types/home";
import { TaxCalculator } from "~/components/tax-calc-page/tax-calc";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Get Your Tax Analysis" },
        { name: "Tax Calculator", content: "Get your tax analysis from our tax calculator tool." },
    ];
}

export default function SalaryCalculatorPage() {
    return <TaxCalculator />;
}
