<template lang="pug">
	q-layout
		q-header
			q-toolbar
		q-page-container
			router-view
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
	name: 'BlogLayout',
});
</script>

<style scoped></style>
