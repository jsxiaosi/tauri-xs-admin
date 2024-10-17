import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const nested: AppRouteRecordRaw[] = [
  {
    path: '/nested',
    redirect: '/nested/menu1',
    name: 'RtNested',
    meta: {
      title: t('route.pathName.nested'),
      icon: 'iEL-grid',
      position: 6,
    },
    children: [
      {
        path: 'menu1',
        name: 'RtMenu1',
        redirect: '/nested/menu1/menu1-1',
        meta: { title: t('route.pathName.nested1') },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'RtMenu1-1',
            meta: { title: t('route.pathName.nested1_1') },
          },
          {
            path: 'menu1-2',
            name: 'RtMenu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: t('route.pathName.nested1_2') },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'RtMenu1-2-1',
                meta: { title: t('route.pathName.nested1_2_1') },
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'RtMenu1-2-2',
                meta: { title: t('route.pathName.nested1_2_2') },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'RtMenu1-3',
            meta: { title: t('route.pathName.nested1_3') },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'RtMenu2',
        meta: { title: t('route.pathName.nested2') },
      },
    ],
  },
];

export default nested;
