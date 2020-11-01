import VueApollo from '@vue/apollo-composable';
import { boot } from 'quasar/wrappers';

export default boot(({ Vue, app }) => {
	app.apolloProvider = Vue.use(VueCompositionApi);
});
