export default [
  {
    path: '/admin',
    component: () => import('./pages/AdminHome.vue'),
  },
  {
    path: '/admin/signin',
    component: () => import('./pages/AdminSignin.vue'),
  },
  {
    path: '/admin/:crud',
    component: () => import('./pages/AdminPage.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/AdminTable.vue'),
        props: route => {
          return {
            crudName: route.params.crud,
          }
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
      },
      {
        path: 'reports',
        component: () => import('./pages/AdminReports.vue'),
        props: route => {
          return {
            crudName: route.params.crud,
          }
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
      },
    ],
  },
]