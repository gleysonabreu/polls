export default {
  bail: true,
  clearMocks: true,

  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest'
}
