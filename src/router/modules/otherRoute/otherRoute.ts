/* Layout */
// import Layout from '@/layouts/index.vue'
// import AppMain from '@/layouts/components/AppMain/index.vue'
import { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/useI18n';

const Layout = () => import('@/layouts/index.vue');
const AppMain = () => import('@/layouts/components/AppMain/index.vue');

const safeManagerRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/useradmin',
    component: Layout,
    redirect: '/useradmin/userlist/',
    name: '用户管理',
    alwaysShow: true,
    meta: { title: t('route.pathName.userInfo'), icon: 'iEL-avatar' },
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/useradmin/userlist/index.vue'),
        meta: { title: t('route.pathName.userList') },
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
        meta: { title: t('route.pathName.userDateil') },
      },
    ],
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://gitlab.com/SuperCuteXiaoSi/vite-vue3-template',
        meta: { title: t('route.pathName.thirdParty'), icon: 'iEL-operation' },
      },
    ],
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/',
    name: 'Nested',
    meta: {
      title: t('route.pathName.nested'),
      icon: 'iEL-grid',
    },
    children: [
      {
        path: 'menu1',
        component: AppMain, // Parent router-view
        name: 'Menu1',
        redirect: '/nested/menu1/menu1-1/',
        meta: { title: t('route.pathName.nested1') },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: t('route.pathName.nested1_1') },
          },
          {
            path: 'menu1-2',
            component: AppMain,
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1/',
            meta: { title: t('route.pathName.nested1_2') },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2',
                meta: { title: t('route.pathName.nested1_2_1') },
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: t('route.pathName.nested1_2_2') },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: t('route.pathName.nested1_3') },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'Menu2',
        meta: { title: t('route.pathName.nested2') },
      },
    ],
  },
];

export default safeManagerRoutes;