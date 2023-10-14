import type { Config } from "jest";

const config: Config = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/mocks/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{js,ts,jsx,tsx}"
    ],
}

export default config;