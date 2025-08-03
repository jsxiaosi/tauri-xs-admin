import { useRouter } from 'vue-router';
import type { LocationQuery } from 'vue-router';
import type { Meta } from '@/router/type';
import { usePermissionStoreHook } from '@/store/modules/permission';

export interface DetailsNavigationOption {
  path: string;
  name: string;
  title: Meta['title'];
  query?: LocationQuery;
}

export const useDetailsNavigation = () => {
  const router = useRouter();

  const openDetails = (options: DetailsNavigationOption) => {
    const { title, ...res } = options;
    usePermissionStoreHook().handleMultiTabs('add', {
      ...res,
      meta: {
        title,
      },
    });
    try {
      router.push({ path: res.path, query: res.query });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    openDetails,
  };
};
