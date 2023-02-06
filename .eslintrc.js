// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  rules: {
    indent: ["error", 4, { SwitchCase: 1 }],
    quotes: ["error", "single", { avoidEscape: true }],
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
