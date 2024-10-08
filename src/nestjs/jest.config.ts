import type { Config } from 'jest';

const config: Config = {
  displayName: {
    name: 'nest',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@fc/micro\\-videos/(.*)$':
      '<rootDir>/../../../node_modules/@fc/micro-videos/dist/$1',
  },
};

export default config;
