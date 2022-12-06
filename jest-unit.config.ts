import jest from './jest.config';

export default {
  ...jest,
  testMatch: ['**/?(*.)+(spec|test).spec.[tj]s?(x)'],
}
