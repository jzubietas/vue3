import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/proyectos',
        name: 'proyectos',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Proyectos/Proyectos.vue'),
        meta: {
          breadcrumb: [
            { name: 'Proyectos' }
          ]
        },
      },
      {
        path: '/google-maps',
        name: 'google-maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue'),
        meta: {
          breadcrumb: [
            { name: 'Google Maps' }
          ]
        },
      },
      {
        path: '/herramienta',
        name: 'herramienta',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Proyectos/HerramientaSnf.vue'),
        meta: {
          breadcrumb: [
            { name: 'Layer Herramienta SNF' }
          ]
        },
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Configuracion/Usuario.vue'),
        meta: {
          auth: true,
        },
      }
    ]
  },
  {
    path: '/',
    //redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
