import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const Layout = () => import('@/layouts/page-layouts/index.vue');

const root: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    name: 'RtRoot',
    meta: {
      title: t('route.pathName.index'),
      icon: 'iEL-home-filled',
      whiteRoute: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { title: '', icon: 'home-filled' },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/layouts/redirect/index.vue'),
      },
    ],
  },
  { path: '/:path(.*)', redirect: '/error/404' },
];

export default root;
