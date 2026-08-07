import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
    ...next,
    {
        rules: {
            semi: [1, "never"],
        },
    }
]);