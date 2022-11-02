import type { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const useradmin: AppRouteRecordRaw[] = [
  {
    path: '/useradmin',
    redirect: '/useradmin/refSyntax',
    name: 'RtUseradmin',
    meta: { title: t('route.pathName.userInfo'), icon: 'iEL-avatar', position: 5 },
    children: [
      {
        path: 'refSyntax',
        name: 'RtRefSyntax',
        component: () => import('@/views/useradmin/refSyntax/index.vue'),
        meta: { title: t('route.pathName.refSyntax') },
      },
      {
        path: 'userlist',
        name: 'RtUserlist',
        component: () => import('@/views/useradmin/userlist/index.vue'),
        meta: { title: t('route.pathName.userList') },
      },
      {
        path: 'asyncComponent',
        name: 'RtAsyncComponent',
        component: () => import('@/views/useradmin/async-component/index.vue'),
        meta: { title: t('route.pathName.asyncComponent') },
      },
    ],
  },
];

export default useradmin;
