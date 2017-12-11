import 'babel-polyfill';
import Vue from 'vue';
import store from 'store';
import {
  sync,
} from 'vuex-router-sync';
import iView from 'iview';
import 'service/axios';
import App from './App';
import router from './router';

Vue.use(iView);

sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
