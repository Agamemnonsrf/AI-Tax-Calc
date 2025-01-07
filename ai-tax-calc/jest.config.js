/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    resetModules: true,
    moduleNameMapper: {
        "^~/(.*)$": "<rootDir>/app/$1",
        "react-markdown": "<rootDir>/app/mock/react-markdown-mock.tsx",
    },
    transform: {
        "^.+.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.jest.json" }],
    },

};