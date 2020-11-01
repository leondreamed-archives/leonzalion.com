<template lang="pug">
	p Article
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api';

import { useGetArticleBySlugQuery } from '~generated/docs-graphql';

export default defineComponent({
	name: 'ArticlePage',
	setup(props, ctx) {
		const { result: articleResult } = useGetArticleBySlugQuery(() => ({
			slug: ctx.root.$route.params.slug,
		}));
		watch(articleResult, (data) => {
			if (data.articles?.[0]) {
				const { title, content } = data.articles[0];
				console.log(title, content);
			}
		});
	},
});
</script>

<style scoped></style>
