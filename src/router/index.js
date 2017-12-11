import Vue from 'vue';
import Router from 'vue-router';
import Auth from 'authorize';
import routes from './routes';
import store from '../store';


Vue.use(Router);

const base = process.env.NODE_ENV !== 'production' ? '' : 'wise/his';

const router = new Router({
  mode: 'history',
  base,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && Auth.checkAuthorized()) {
    next({
      name: 'hospital',
    });
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    store.dispatch('login/fetchManagerAuth').then((authlist) => {
      if (!Auth.checkAuthorized()) { // first level
        Auth.unauthorized(to);
      } else if (to.name === 'hospital') {
        next({
          name: store.getters['hospital/redirect'],
        });
      } else if (
        authlist.every(i => i !== to.name && i !== to.meta.parent) // second level
      ) {
        next({
          name: 'error',
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});


export default router;
