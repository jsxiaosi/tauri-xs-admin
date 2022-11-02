import type { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const detailsPage: AppRouteRecordRaw[] = [
  {
    path: '/details_page',
    name: 'RtDetailsPage',
    meta: { title: t('route.pathName.detailsPage'), icon: 'iEL-management', position: 9 },
    component: () => import('@/views/details-page/index.vue'),
    children: [
      {
        path: 'details_info',
        name: 'RtDetailsInfo',
        hidden: true,
        meta: {
          title: '',
          icon: 'iEL-management',
          whiteList: true,
          keepAlive: true,
        },
        component: () => import('@/views/details-page/datails-info/index.vue'),
      },
      {
        path: 'details_params/:id',
        name: 'RtDetailsParams',
        hidden: true,
        meta: {
          title: '',
          icon: 'iEL-management',
          whiteList: true,
          keepAlive: true,
        },
        component: () => import('@/views/details-page/datails-params/index.vue'),
      },
    ],
  },
];

export default detailsPage;
