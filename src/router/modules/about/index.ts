import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const about: AppRouteRecordRaw[] = [
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    meta: {
      title: t('route.pathName.about'),
      icon: 'about',
      alwaysShow: false,
      position: 11,
    },
    children: [
      {
        path: 'index',
        name: 'RtAbout',
        component: () => import('@/views/about/index.vue'),
        meta: { title: t('route.pathName.about') },
      },
    ],
  },
];

export default about;
