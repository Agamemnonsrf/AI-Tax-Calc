import SignIn from "~/components/sign-in-page/sign-in";
import type { Route } from "./+types/home";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Sign in" },
        { name: "Sign in page", content: "Sign in to save your sessions" },
    ];
}

export default function SignInPage() {
    return <SignIn />;
}
