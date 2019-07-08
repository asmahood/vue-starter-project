module.exports = {
	root: true,
	env: {
		node: true,
		es6: true
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2018
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'comma-dangle': ['error', 'never'],
		'brace-style': [2, '1tbs'],
		'indent': ['error', 'tab', { SwitchCase: 1 }]
	}
}
