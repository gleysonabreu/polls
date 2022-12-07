export default {
  bail: true,
  clearMocks: true,

  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/app.ts',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/modules/**/useCases/**/index.ts',
    '!<rootDir>/src/ports/**/*.ts',
    '!<rootDir>/src/@types/*.d.ts',
    '!<rootDir>/src/lib/*.ts',
    '!<rootDir>/src/modules/**/infra/**/*.ts'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest'
}
