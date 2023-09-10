import { useDetailsNavigation } from '@/hooks/web/useDetailsNavigation';

export function useDatailsInfo() {
  const { openDetails } = useDetailsNavigation();

  function toDatailsInfo(params: string, model: string) {
    if (model === 'query') {
      // query 参数详情页
      openDetails({
        path: `/details_page/details_info`,
        name: `RtDetailsInfo`,
        query: { id: `${params}` },
        title: { 'zh-CN': `详情页-${params}`, en: `pageDatails-${params}` },
      });
    } else {
      // params 参数详情页
      openDetails({
        path: `/details_page/details_params/${params}`,
        name: `RtDetailsParams`,
        title: { 'zh-CN': `详情页-params-${params}`, en: `pageDatails-${params}` },
      });
    }
  }

  return { toDatailsInfo };
}
