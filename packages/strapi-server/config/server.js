module.exports = ({ env }) => ({
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),
	admin: {
		auth: {
			secret: process.env.ADMIN_JWT_SECRET,
		},
	},
});
