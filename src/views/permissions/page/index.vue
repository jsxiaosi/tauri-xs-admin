<script setup lang="ts">
  import { RoleEnum } from '@/enum/role';
  import { initRoute } from '@/router/utils';
  import { useUserInfoStoreHook } from '@/store/modules/user';

  defineOptions({
    name: 'RtPermissions',
  });

  const userInfoStore = useUserInfoStoreHook();

  const roleChange = async () => {
    userInfoStore.setRoles(userInfoStore.roles === RoleEnum.ADMIN ? RoleEnum.TEST : RoleEnum.ADMIN);
    initRoute(userInfoStore.roles);
  };
</script>

<template>
  <div class="page-container">
    <span>切换权限：</span>
    <el-button @click="roleChange">
      {{ userInfoStore.roles }}
    </el-button>
  </div>
</template>
