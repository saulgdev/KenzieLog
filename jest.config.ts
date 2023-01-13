module.exports = {
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/__tests__/integrations/**/*.[jt]s?(x)"],
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/*/.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: { ".+.ts$": "ts-jest" },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};