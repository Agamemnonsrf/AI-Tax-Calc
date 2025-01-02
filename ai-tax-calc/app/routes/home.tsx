import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Tax Calculation and Advisory" },
        { name: "Welcome Page", content: " Welcome to the Tax Calculation and Advisory website." },
    ];
}

export default function Home() {
    return <Welcome />;
}
