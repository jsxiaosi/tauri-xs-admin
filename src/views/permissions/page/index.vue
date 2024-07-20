<script setup lang="ts">
  import { _storage } from '@jsxiaosi/utils';
  import { initRoute } from '@/router/utils';
  import { RoleEnum } from '@/enum/role';
  import { useUserInfoStoreHook } from '@/store/modules/user';

  const userInfoStore = useUserInfoStoreHook();

  defineOptions({
    name: 'RtPermissions',
  });

  const roleChange = async () => {
    userInfoStore.setRoles(userInfoStore.roles === RoleEnum.ADMIN ? RoleEnum.TEST : RoleEnum.ADMIN);
    initRoute(userInfoStore.roles);
  };
</script>

<template>
  <div class="page-container">
    <span>切换权限：</span>
    <el-button @click="roleChange"> {{ userInfoStore.roles }} </el-button>
  </div>
</template>
