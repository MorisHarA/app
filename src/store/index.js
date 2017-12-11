import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const generateModules = () => {
  const context = require.context('./modules', false, /\.js$/);
  return {
    modules: context.keys().reduce((r, key) =>
    ({ ...r, [key.slice(2, -3)]: context(key).default }), {}),
    context,
  };
};

const store = new Vuex.Store({
  modules: generateModules().modules,
  plugins: [],
  strict: debug,
});

if (module.hot) {
  const files = generateModules().context
    .keys()
    .map(m => m.replace('./', './modules/'));
  module.hot.accept(files, () => {
    store.hotUpdate({
      modules: generateModules().modules,
    });
  });
}

export default store;
