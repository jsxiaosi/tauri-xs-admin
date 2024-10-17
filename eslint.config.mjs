import jsxiaosiConfig from '@jsxiaosi/eslint-config';

export default jsxiaosiConfig(
  {
    vue: true,
    prettier: true,
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
);
