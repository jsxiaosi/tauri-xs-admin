import jsxiaosiConfig from '@jsxiaosi/eslint-config';

export default jsxiaosiConfig(
  {
    vue: true,
    prettier: {
      usePrettierrc: true,
    },
    ignores: ['src/**/china.json', 'src-tauri/target/**'],
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
);
