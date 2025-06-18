import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    plugins: ["simple-import-sort"],
    parser: "@typescript-eslint/parser",
    rules: {
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["warn"],
      "no-unused-vars": ["off"],
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": ["warn"],
      "simple-import-sort/imports": ["warn"],
      "simple-import-sort/exports": ["warn"],
      "import/no-duplicates": ["warn"],
    },
  }),
];

export default eslintConfig;
