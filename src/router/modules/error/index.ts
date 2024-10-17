import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const Layout = () => import('@/layouts/page-layouts/index.vue');

const error: AppRouteRecordRaw[] = [
  {
    path: '/error',
    redirect: '/error/404',
    name: 'error',
    component: Layout,
    meta: {
      title: t('route.pathName.error'),
      icon: 'iEL-remove-filled',
      position: 8,
      whiteRoute: true,
      alwaysShow: true,
    },
    children: [
      {
        path: '403',
        name: '403',
        component: () => import('@/views/error/403.vue'),
        meta: { title: t('route.pathName.error403') },
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: { title: t('route.pathName.error404') },
      },
      {
        path: '500',
        name: '500',
        component: () => import('@/views/error/500.vue'),
        meta: { title: t('route.pathName.error500') },
      },
    ],
  },
];

export default error;
