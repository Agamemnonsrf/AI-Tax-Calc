import type { Route } from "./+types/home";
import SalaryCalculator from "~/components/salary-calc-page/salary-calc";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Calculate your salary" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function SalaryCalculatorPage() {
    return <SalaryCalculator />;
}
