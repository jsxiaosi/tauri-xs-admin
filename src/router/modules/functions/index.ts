import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const functions: AppRouteRecordRaw[] = [
  {
    path: '/functions',
    redirect: '/functions/preview-pdf',
    name: 'Functions',
    meta: {
      title: 'route.pathName.functions',
      icon: 'iEL-briefcase',
      position: 2,
      whiteRoute: true,
      alwaysShow: true,
    },
    children: [
      {
        path: 'water_mark',
        name: 'RtWaterMark',
        component: () => import('@/views/functions/water-mark/index.vue'),
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
      {
        path: 'guide',
        name: 'RtGuide',
        component: () => import('@/views/functions/guide/index.vue'),
        meta: { title: t('route.pathName.guide') },
      },
    ],
  },
];

export default functions;
