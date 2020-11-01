module.exports = {
	root: true,
	extends: ['airbnb-base', 'prettier'],
	plugins: ['simple-import-sort'],
	// add your custom rules here
	rules: {
		// TypeScript
		quotes: ['warn', 'single', { avoidEscape: true }],
		'no-restricted-syntax': 'off',
		eqeqeq: ['error', 'allow-null'],
		'sort-imports': 'off',
		'import/order': 'off',
		'simple-import-sort/sort': 'error',
		'import/prefer-default-export': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
		'no-lonely-if': 'off'
	}
};
