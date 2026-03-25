import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        Promise: "readonly",
        IntersectionObserver: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "semi": ["error", "always"],
      "no-undef": "error",
    },
  },
];
