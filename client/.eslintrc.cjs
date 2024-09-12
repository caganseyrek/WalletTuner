module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
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
  overrides: [
    {
      files: ["src/shared/utils/requester.ts"],
      rules: { "no-unused-vars": "off" },
    },
    {
      files: ["src/hooks/useOnMountEffect.ts"],
      rules: { "react-hooks/exhaustive-deps": "off" },
    },
  ],
};
