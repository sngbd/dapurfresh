module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    camelcase: 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    // 'no-constant-condition': ['error', { checkLoops: false }],
  },
};
