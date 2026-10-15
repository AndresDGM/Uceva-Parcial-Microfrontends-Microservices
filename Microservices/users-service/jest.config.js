/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/app.ts",
    "!src/infrastructure/web/server.ts",
    "!src/infrastructure/web/config/**/*.ts",
    "!src/infrastructure/web/interfaces/**/*.ts",
    "!src/infrastructure/web/erros/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};