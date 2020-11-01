import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
	{
		path: '/',
		component: () => import('~/pages/LandingPage.vue'),
	},
	{
		path: '/blog',
		component: () => import('~/layouts/Blog'),
		children: [
			{
				path: 'articles',
				component: () =>
					import('~/pages/Blog/Articles/ArticlesLandingPage.vue'),
			},
			{
				path: 'projects',
				component: () =>
					import('~/pages/Blog/Projects/ProjectsLandingPage.vue'),
			},
			{
				path: 'article/:slug',
				component: () => import('~/pages/Blog/Articles/ArticlePage.vue'),
			},
			{
				path: 'project/:slug',
				component: () => import('~/pages/Blog/Projects/ProjectPage.vue'),
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue'),
	},
];

export default routes;
