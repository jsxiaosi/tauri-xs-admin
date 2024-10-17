import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const editor: AppRouteRecordRaw[] = [
  {
    path: '/editor',
    redirect: '/editor/rich-text',
    name: 'RtEditor',
    meta: { title: t('route.pathName.editor'), icon: 'editor', position: 4 },
    children: [
      {
        path: 'rich-text',
        name: 'RtRichText',
        component: () => import('@/views/editor/rich-text/index.vue'),
        meta: { title: t('route.pathName.editor_richText') },
      },
      {
        path: 'markdown',
        name: 'RtMarkdown',
        component: () => import('@/views/editor/markdown/index.vue'),
        meta: { title: t('route.pathName.editor_markdown') },
      },
      {
        path: 'logic-flow',
        name: 'RtLogicFlow',
        component: () => import('@/views/editor/logic-flow/index.vue'),
        meta: { title: t('route.pathName.editor_logicFlow') },
      },
    ],
  },
];

export default editor;
