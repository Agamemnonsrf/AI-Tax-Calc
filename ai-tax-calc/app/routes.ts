import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("calculate-tax", "routes/calculate-tax.tsx"),
    route("tax-advisor", "routes/tax-advisor.tsx"),
] satisfies RouteConfig;
