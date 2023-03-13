import type { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const Layout = () => import('@/layouts/pageLayouts/index.vue');

const functions: AppRouteRecordRaw[] = [
  {
    path: '/functions',
    redirect: '/functions/preview-pdf',
    name: 'Functions',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'route.pathName.functions',
      icon: 'iEL-briefcase',
      position: 2,
      whiteList: true,
    },
    children: [
      {
        path: 'water_mark',
        name: 'RtWaterMark',
        component: () => import('@/views/functions/waterMark/index.vue'),
        meta: { title: t('route.pathName.waterMark') },
      },
      {
        path: 'preview-pdf',
        name: 'RtPreviewPdf',
        component: () => import('@/views/functions/pdf/index.vue'),
        meta: { title: t('route.pathName.pdf') },
      },
      {
        path: 'preview-docx',
        name: 'RtPreviewDocx',
        component: () => import('@/views/functions/docx/index.vue'),
        meta: { title: t('route.pathName.docx') },
      },
    ],
  },
];

export default functions;
