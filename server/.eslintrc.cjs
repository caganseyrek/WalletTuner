module.exports = {
  root: true,
  env: { node: true, es2016: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    "no-alert": "warn",
    "no-console": ["warn", { allow: ["error"] }],
    "no-constant-condition": "error",
    "no-debugger": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-unreachable": "error",
    "use-isnan": "error",
    eqeqeq: ["error", "smart"],
    "no-eval": "error",
    "no-floating-decimal": "error",
    "no-new": "error",
    "no-return-assign": "error",
    "no-self-compare": "error",
    "no-undef-init": "error",
    "no-var": "error",
    "no-unused-vars": "error",
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    "new-parens": "error",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
    quotes: ["error", "double", { avoidEscape: true }],
  },
};
