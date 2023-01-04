import { useRouter } from 'vue-router';
import { usePermissionStoreHook } from '@/store/modules/permission';

export function useDatailsInfo() {
  const router = useRouter();

  function toDatailsInfo(params: string, model: string) {
    if (model === 'query') {
      usePermissionStoreHook().handleMultiTabs('add', {
        path: `/details_page/details_info`,
        name: `RtDetailsInfo`,
        query: { id: `${params}` },
        meta: {
          title: { 'zh-ch': `详情页-${params}`, en: `pageDatails-${params}` },
        },
      });
      router.push({ name: 'RtDetailsInfo', query: { id: `${params}` } });
    } else {
      usePermissionStoreHook().handleMultiTabs('add', {
        path: `/details_page/details_params/${params}`,
        name: `RtDetailsParams`,
        params: { id: `${params}` },
        meta: {
          title: { 'zh-ch': `详情页-params-${params}`, en: `pageDatails-${params}` },
        },
      });
      router.push({ name: 'RtDetailsParams', params: { id: `${params}` } });
    }
  }

  return { toDatailsInfo };
}
