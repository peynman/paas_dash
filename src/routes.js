export default [
  {
    path: '/admin',
    component: () => import('./pages/AdminHome.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/signin',
    component: () => import('./pages/AdminSignin.vue'),
    name: 'signin',
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/admin/:crud',
    component: () => import('./pages/AdminPage.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        component: () => import('./pages/AdminTable.vue'),
        props: route => {
          return {
            crudName: route.params.crud,
          }
        },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'create',
        component: () => import('./pages/AdminCreate.vue'),
        props: route => {
          return {
            crudName: route.params.crud,
          }
        },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'reports',
        component: () => import('./pages/AdminReports.vue'),
        props: route => {
          return {
            crudName: route.params.crud,
          }
        },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: ':id',
        component: () => import('./pages/AdminEdit.vue'),
        props: route => {
          return {
            crudName: route.params.crud,
            objectId: route.params.id,
          }
        },
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
]
