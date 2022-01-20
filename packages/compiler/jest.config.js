// @ts-check

import defaultConfig from "../../jest.default.config.mjs";

const config = {
  ...defaultConfig,
  testMatch: ["<rootDir>/test/**/*.ts"],
  testPathIgnorePatterns: ["<rootDir>/test/manual/"],
};

export default config;
