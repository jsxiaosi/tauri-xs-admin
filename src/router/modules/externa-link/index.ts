import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const externalLink: AppRouteRecordRaw[] = [
  {
    path: '/external-link',
    // component: Layout,
    name: 'RtExternal',
    meta: {
      title: t('route.pathName.externalLink'),
      icon: 'link',
      alwaysShow: true,
      position: 9,
    },
    children: [
      {
        path: 'https://jsxiaosi.github.io/vue-xs-admin-docs/',
        name: 'RtGitLink',
        meta: { title: t('route.pathName.externalDocument') },
      },
      {
        path: 'embedded-page',
        component: () => import('@/views/external-link/embedded-page/index.vue'),
        name: 'RtGitLink',
        meta: {
          title: t('route.pathName.embeddedDocument'),
          externalUrl: 'https://jsxiaosi.github.io/vue-xs-admin-docs/',
        },
      },
    ],
  },
];

export default externalLink;
