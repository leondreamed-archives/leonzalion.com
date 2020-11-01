const { parse } = require('pg-connection-string');

module.exports = () => ({
	defaultConnection: 'default',
	connections: {
		default: {
			connector: 'bookshelf',
			settings: {
				client: 'postgres',
				...parse(process.env.DATABASE_URL),
			},
			options: {},
		},
	},
});
