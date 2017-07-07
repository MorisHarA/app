import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const routes = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component(resolve) {
      require(['components/login/main'], resolve)
    }
  },
  {
    path: '/hospital',
    name: 'hospital',
    component(resolve) {
      require(['components/hospital/main'], resolve)
    },
    redirect: {
      name: 'commentstat'
    },
    children: [
      {
        path: 'commentstat',
        name: 'commentstat',
        component(resolve) {
          require(['components/review/total'], resolve)
        }
      },
      {
        path: 'commentdetail',
        name: 'commentdetail',
        component(resolve) {
          require(['components/review/detail'], resolve)
        }
      },
      {
        path: 'questionnairestat',
        name: 'questionnairestat',
        component(resolve) {
          require(['components/questionnairestat/main'], resolve)
        }
      },
      {
        path: 'questionnairedetail',
        name: 'questionnairedetail',
        component(resolve) {
          require(['components/questionnairedetail/main'], resolve)
        }
      },
      {
        path: 'detail',
        name: 'detail',
        component(resolve) {
          require(['components/detail/main'], resolve)
        }
      },
      {
        path: 'modifypassword',
        name: 'modifypassword',
        component(resolve) {
          require(['components/modifypassword/main'], resolve)
        }
      },
    ]
  },
  {
    path:'*',
    component(resolve) {
      require(['components/common/404/main'], resolve)
    }
  }
]


const router = new Router({
  mode: 'history', //html5模式
  base: '/wise/his',
  routes
})

export default router

