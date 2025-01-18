import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            '**/bootstrap/ssr/*',
            '**/node_modules/*',
            '**/vendor/*',
            '**/public/build/*',
        ],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
            'plugin:prettier/recommended',
        ),
    ),
    {
        name: 'ESLint Configuration - SIMAKARA Tryout',
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        files: ['**/*.{js,mjs,cjs,jsx}'],
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
            'no-undef': 'off',
        },
    },
];
