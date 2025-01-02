import TaxAdvisorPage from "~/components/tax-advisor-page/tax-advisor-page";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Get Tax Advice" },
        { name: "Tax Advisor", content: "Get tax advice from our AI-powered tax advisor." },
    ];
}

export default function SalaryCalculatorPage() {
    return <TaxAdvisorPage />;
}
