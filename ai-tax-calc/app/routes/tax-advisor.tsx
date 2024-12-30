import TaxAdvisorPage from "~/components/tax-advisor-page/tax-advisor-page";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Get Tax Advice" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function SalaryCalculatorPage() {
    return <TaxAdvisorPage />;
}
