import { RoleEnum } from '@/enum/role';
import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const permissions: AppRouteRecordRaw[] = [
  {
    path: '/permissions',
    redirect: '/permissions/page',
    name: 'RtPermissions',
    meta: { title: 'route.pathName.permissions', icon: 'guide', position: 7 },
    children: [
      {
        path: 'page',
        name: 'RtPermissionsPage',
        component: () => import('@/views/permissions/page/index.vue'),
        meta: { title: t('route.pathName.permissionsPage') },
      },
      {
        path: 'test-page-admin',
        name: 'RtPermissionsTestPageAdmin',
        component: () => import('@/views/permissions/test-permissions-a/index.vue'),
        meta: { title: t('route.pathName.testPermissionsPage1'), roles: [RoleEnum.ADMIN] },
      },
      {
        path: 'test-page-test',
        name: 'RtPermissionsTestPageTest',
        component: () => import('@/views/permissions/test-permissions-b/index.vue'),
        meta: { title: t('route.pathName.testPermissionsPage2'), roles: [RoleEnum.TEST] },
      },
    ],
  },
];

export default permissions;
