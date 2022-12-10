export default {
  bail: true,
  clearMocks: true,

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/app.ts',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/modules/**/useCases/**/index.ts',
    '!<rootDir>/src/ports/**/*.ts',
    '!<rootDir>/src/@types/*.d.ts',
    '!<rootDir>/src/lib/*.ts',
    '!<rootDir>/src/modules/**/infra/**/*.ts',
    '!<rootDir>/src/modules/**/entities/*.ts',
    '!<rootDir>/src/modules/**/dtos/*.ts',
    '!<rootDir>/src/modules/**/repositories/types.ts',
    '!<rootDir>/src/modules/**/repositories/*-repository.ts',
    '!<rootDir>/src/protocols/*.ts',
    '!<rooDir>/src/providers/auth/auth.ts'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest'
}
