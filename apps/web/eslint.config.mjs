import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,

  {
    plugins: { react },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "func-style": ["warn", "expression"],
      "prefer-arrow-callback": "warn",
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
