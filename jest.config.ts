import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-fixed-jsdom',
    testMatch: [
        '**/__tests__/**/*.test.[jt]s?(x)', // .test.tsx 파일만 테스트 파일로 인식
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
};

export default createJestConfig(customJestConfig);
