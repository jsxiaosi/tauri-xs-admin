import jsxiaosiConfig from '@jsxiaosi/eslint-config';

export default jsxiaosiConfig(
  {
    vue: true,
    prettier: {
      usePrettierrc: true,
    },
    ignores: ['src/**/china.json'],
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
);
