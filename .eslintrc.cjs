module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: [
        'simple-import-sort',
        'import',
    ],
    extends: [
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        "simple-import-sort/imports": "error",
        "import/first": "error",
        "import/newline-after-import": ["error", { "count": 1 }],
        "import/no-duplicates": "error",
        'no-console': 'warn',
        'sort-imports': ['error', {
            'ignoreCase': true,
            'ignoreDeclarationSort': true,
            'ignoreMemberSort': false,
            'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
            'allowSeparatedGroups': false
        }],
    },
    ignorePatterns: ['.eslintrc.js']
};

