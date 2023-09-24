export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg)$': '<rootDir>/test/__ mocks __/fileMock.js',
        '\\.(css|scss|png)$': 'identity-obj-proxy'
    },
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{js,ts,jsx,tsx}"
    ]
}