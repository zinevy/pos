module.exports = {
    extends: ["standard", "prettier", "prettier/react"],
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: true,
    },
    rules: {
        "react/jsx-max-props-per-line": [1, { maximum: 4 }],
        "react/prop-types": 0,
        "react/display-name": "off",
        "import/no-cycle": 0,
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".js", ".jsx"],
            },
        ],
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                tabWidth: 4,
                singleQuote: false,
                jsxBracketSameLine: true,
                trailingComma: "es5",
                semi: false,
            },
        ],
    },
    plugins: ["prettier"],
    extends: ["plugin:react/recommended"],
}
