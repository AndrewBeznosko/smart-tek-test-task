module.exports = {
  "env": {
    "browser": true, "es2021": true
  },

  "extends": [// "standard-with-typescript",
    "plugin:vue/vue3-recommended"], "overrides": [{
    "env": {
      "node": true
    }, "files": [".eslintrc.{js,cjs}"], "parserOptions": {
      "sourceType": "script", project: ['./tsconfig.json'], // Specify it only for TypeScript files
    },
  }],

  "parserOptions": {
    "ecmaVersion": "latest", "sourceType": "module", "project": ["./tsconfig.json"]
  },

  "plugins": ["vue"],

  "rules": {
    // 0 - "off"
    // 1 - "warn"
    // 2 - "error"
    'semi': ['error', 'always'],}
}
