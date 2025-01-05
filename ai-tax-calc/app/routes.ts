import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [

    layout("./components/layouts/auth-layout.tsx", [
        route("/", "./routes/home.tsx"),
        route("calculate-tax", "./routes/calculate-tax.tsx"),
        route("tax-advisor", "./routes/tax-advisor.tsx"),
        route("sign-in", "./routes/sign-in.tsx"),
    ]),
] satisfies RouteConfig;
