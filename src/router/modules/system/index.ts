import type { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const system: AppRouteRecordRaw[] = [
  {
    path: '/system',
    redirect: '/system/power',
    name: 'RtSystem',
    meta: { title: 'route.pathName.system', icon: 'guide', position: 7 },
    children: [
      {
        path: 'power',
        name: 'RtPower',
        component: () => import('@/views/system/power/index.vue'),
        meta: { title: t('route.pathName.power'), keepAlive: true },
      },
      {
        path: 'guide',
        name: 'RtGuide',
        component: () => import('@/views/system/guide/index.vue'),
        meta: { title: t('route.pathName.guide') },
      },
    ],
  },
];

export default system;
