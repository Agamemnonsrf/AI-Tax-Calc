import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import { Welcome } from "../components/welcome";
import { TextEncoder, TextDecoder } from 'util'
import { BrowserRouter, createMemoryRouter, Route, RouterProvider, Routes } from 'react-router';
import { TaxCalculator } from '../components/tax-calc-page/tax-calc';
import SignIn from '~/components/sign-in-page/sign-in';
import { AuthProvider } from '~/context/AuthContext';
import TaxAdvisorPage from '~/components/tax-advisor-page/tax-advisor-page';

global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder

it('can render all pages', async () => {
    const container1 = document.createElement('div');
    document.body.appendChild(container1);

    await act(async () => {
        ReactDOMClient.createRoot(container1).render(<BrowserRouter><Welcome /></BrowserRouter>);
    });

    const label = container1.querySelector('h1');
    expect(label?.textContent).toBe("Welcome to AI Tax Calculator")

    const container2 = document.createElement('div');
    document.body.appendChild(container2);

    await act(async () => {
        ReactDOMClient.createRoot(container2).render(<BrowserRouter><TaxCalculator /></BrowserRouter>);
    });

    const label2 = container2.querySelector('h2');
    expect(label2?.textContent).toBe("Tax Calculator")

    const container3 = document.createElement('div');
    document.body.appendChild(container3);

    await act(async () => {
        ReactDOMClient.createRoot(container3).render(<BrowserRouter><TaxAdvisorPage /></BrowserRouter>);
    });

    const label3 = container3.querySelector('h2');
    expect(label3?.textContent).toBe("Tax Advisor")

    const container4 = document.createElement('div');
    document.body.appendChild(container4);

    const router = createMemoryRouter([
        {
            path: "/",
            element: (
                <AuthProvider>
                    <SignIn />
                </AuthProvider>
            ),
        },
    ]);

    await act(async () => {
        ReactDOMClient.createRoot(container4).render(
            <RouterProvider router={router} />
        );
    });
    const label4 = container4.querySelector('h2');
    expect(label4?.textContent).toBe("Sign In")

});

