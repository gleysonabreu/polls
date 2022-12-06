import jest from './jest.config';

export default {
  ...jest,
  testMatch: ['**/?(*.)+(spec|test).test.[tj]s?(x)'],
}
