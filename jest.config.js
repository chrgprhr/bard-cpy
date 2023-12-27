module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.css$": ["jest-transform-css", { modules: true }],
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testEnvironment: "jsdom",
};
