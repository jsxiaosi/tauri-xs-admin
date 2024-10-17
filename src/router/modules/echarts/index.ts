import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const echarts: AppRouteRecordRaw[] = [
  {
    path: '/echarts',
    redirect: '/echarts/bar',
    name: 'RtEcharts',
    meta: { title: t('route.pathName.echarts'), icon: 'echarts', position: 3 },
    children: [
      {
        path: 'bar',
        name: 'RtBar',
        component: () => import('@/views/echarts/bar/index.vue'),
        meta: { title: t('route.pathName.echarts_bar') },
      },
      {
        path: 'map',
        name: 'RtMap',
        component: () => import('@/views/echarts/map/index.vue'),
        meta: { title: t('route.pathName.echarts_map') },
      },
    ],
  },
];

export default echarts;
