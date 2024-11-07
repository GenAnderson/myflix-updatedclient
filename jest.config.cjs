module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jest-environment-jsdom", // Ensures Jest uses jsdom
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  moduleNameMapper: {
    // If you have CSS imports, map them here
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
