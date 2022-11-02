import type { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const externalLink: AppRouteRecordRaw[] = [
  {
    path: '/external-link',
    // component: Layout,
    name: 'RtExternal',
    meta: { title: t('route.pathName.thirdParty'), icon: 'link', position: 10 },
    children: [
      {
        path: 'https://github.com/SuperCuteXiaoSi/xiaosiAdmin',
        name: 'RtGitLink',
        meta: { title: t('route.pathName.thirdParty'), icon: 'link' },
      },
    ],
  },
];

export default externalLink;
