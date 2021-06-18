module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['standard', 'plugin:vue/essential', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['vue'],
	rules: {
		'prettier/prettier': 'error',
		'no-unused-vars': 'off',
		'vue/no-multiple-template-root': 'off',
		camelcase: 0,
	},
}
