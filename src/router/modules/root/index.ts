import type { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const Layout = () => import('@/layouts/pageLayouts/index.vue');

const root: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    name: 'RtRoot',
    meta: { title: t('route.pathName.index'), icon: 'iEL-home-filled', whiteList: true },
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
