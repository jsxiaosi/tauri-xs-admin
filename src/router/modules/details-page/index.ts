import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const detailsPage: AppRouteRecordRaw[] = [
  {
    path: '/details_page',
    name: 'RtDetailsPage',
    meta: {
      title: t('route.pathName.detailsPage'),
      icon: 'iEL-management',
      position: 10,
    },
    component: () => import('@/views/details-page/index.vue'),
    children: [
      {
        path: 'details_info',
        name: 'RtDetailsInfo',
        meta: {
          title: '',
          icon: 'iEL-management',
          whiteRoute: true,
          keepAlive: true,
          hideSidebar: true,
        },
        component: () => import('@/views/details-page/datails-info/index.vue'),
      },
      {
        path: 'details_params/:id',
        name: 'RtDetailsParams',
        meta: {
          title: '',
          icon: 'iEL-management',
          whiteRoute: true,
          keepAlive: true,
          hideSidebar: true,
        },
        component: () => import('@/views/details-page/datails-params/index.vue'),
      },
    ],
  },
];

export default detailsPage;
