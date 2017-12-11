

export default [
  {
    path: '/',
    redirect: {
      name: 'login',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('components/login/main'),
  },
  {
    path: '/hospital',
    name: 'hospital',
    meta: {
      requireAuth: true,
    },
    component: () => import('components/hospital/main'),
    children: [
      {
        path: 'commentstat',
        name: 'commentstat',
        component: () => import('components/review/total'),
      },
      {
        path: 'commentdetail',
        name: 'commentdetail',
        component: () => import('components/review/detail'),
      },
      {
        path: 'questionnairestat',
        name: 'questionnairestat',
        component: () => import('components/questionnairestat/main'),
      },
      {
        path: 'questionnairedetail',
        name: 'questionnairedetail',
        component: () => import('components/questionnairedetail/main'),
      },
      {
        path: 'hospitaldetail',
        name: 'hospitaldetail',
        component: () => import('components/hospitaldetail/main'),
      },
      {
        path: 'replytemplate',
        name: 'replytemplate',
        component: () => import('components/replytemplate/main'),
      },
      {
        path: 'authority',
        name: 'authority',
        component: () => import('components/authority/main'),
      },
      {
        path: 'modifypassword',
        name: 'modifypassword',
        component: () => import('components/modifypassword/main'),
      },
      {
        path: 'satisfactionstat',
        name: 'satisfactionstat',
        component: () => import('components/satisfactionstat/main'),
      },
      {
        path: 'satisfactiondetail',
        name: 'satisfactiondetail',
        meta: {
          parent: 'satisfactionstat',
        },
        component: () => import('components/satisfactiondetail/main'),
      },
      {
        path: 'questionnaireinfo',
        name: 'questionnaireinfo',
        meta: {
          parent: 'satisfactionstat',
        },
        component: () => import('components/questionnaireinfo/main'),
      },
      {
        path: 'answersheetdetail',
        name: 'answersheetdetail',
        meta: {
          parent: 'questionnairedetail',
        },
        component: () => import('components/answersheetdetail/main'),
      },
      {
        path: 'addmember',
        name: 'addmember',
        meta: {
          parent: 'authority',
        },
        component: () => import('components/privilegemanage/addmember'),
      },
      {
        path: 'error',
        name: 'error',
        component: () => import('components/error/main'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('components/common/404/main'),
  },
];

