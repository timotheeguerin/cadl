// @ts-check

const config = {
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageReporters: ["json", "html", "cobertura"],
  coveragePathIgnorePatterns: ["/node_modules/", ".*/test/.*"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  setupFilesAfterEnv: [],
  verbose: true,
  // testEnvironment: "node",
};

export default config;
