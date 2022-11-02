import type { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const Layout = () => import('@/layouts/pageLayouts/index.vue');

const error: AppRouteRecordRaw[] = [
  {
    path: '/error',
    redirect: '/error/404',
    name: 'error',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'route.pathName.error',
      icon: 'iEL-remove-filled',
      position: 8,
    },
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: { title: t('route.pathName.error404') },
      },
    ],
  },
];

export default error;
