import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const component: AppRouteRecordRaw[] = [
  {
    path: '/components',
    // component: Layout,
    redirect: '/components/form',
    name: 'RtComponents',
    meta: {
      title: t('route.pathName.components'),
      icon: 'components',
      position: 2,
    },
    children: [
      {
        path: 'form',
        name: 'RtForm',
        component: () => import('@/views/components/form/index.vue'),
        meta: { title: t('route.pathName.form'), keepAlive: true },
      },
      {
        path: 'table',
        name: 'RtTable',
        component: () => import('@/views/components/table-page/index.vue'),
        meta: { title: t('route.pathName.table') },
      },
      {
        path: 'drag',
        name: 'RtDrag',
        component: () => import('@/views/components/drag/index.vue'),
        meta: { title: t('route.pathName.dragCpts') },
      },
      {
        path: 'count-to',
        name: 'RtCountTo',
        component: () => import('@/views/components/count-to/index.vue'),
        meta: { title: t('route.pathName.countTo') },
      },
      {
        path: 'seamless-scroll',
        name: 'RtSeamlessScroll',
        component: () => import('@/views/components/seamless-scroll/index.vue'),
        meta: { title: t('route.pathName.seamlessScroll') },
      },
      {
        path: 'date-time',
        // Parent router-view
        name: 'DateTime',
        redirect: '/components/date-time/date',
        meta: { title: t('route.pathName.date') },
        children: [
          {
            path: 'date-select',
            name: 'RtDate',
            component: () => import('@/views/components/date/index.vue'),
            meta: { title: t('route.pathName.dateSelect'), keepAlive: true },
          },
          {
            path: 'calendar',
            name: 'RtCalendar',
            component: () => import('@/views/components/calendar/index.vue'),
            meta: { title: t('route.pathName.calendar') },
          },
        ],
      },
    ],
  },
];

export default component;
