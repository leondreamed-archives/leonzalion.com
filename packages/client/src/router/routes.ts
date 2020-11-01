import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
	{
		path: '/',
		component: () => import('src/layouts/ArticleLayout.vue'),
		children: [{ path: '', component: () => import('pages/Index.vue') }],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue'),
	},
];

export default routes;
