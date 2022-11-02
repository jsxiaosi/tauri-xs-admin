import type { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const about: AppRouteRecordRaw[] = [
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    alwaysShow: false,
    meta: { title: t('route.pathName.about'), icon: 'about', position: 11 },
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
