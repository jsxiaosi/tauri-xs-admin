<script setup lang="ts">
  import { ElButton } from 'element-plus';
  import { useRouter } from 'vue-router';
  import SvgIcon from '@/components/SvgIcon/index.vue';

  const router = useRouter();
  const toHome = () => {
    router.push('/');
  };
</script>

<template>
  <div class="error-container">
    <div class="error-icon">
      <SvgIcon name="error-403" class-name="icon" />
    </div>
    <div class="text">
      <span>{{ $t('error-page.403.title') }}</span>
    </div>
    <div class="description">
      {{ $t('error-page.403.description') }}
    </div>

    <ElButton type="primary" @click="toHome">
      {{ $t('error-page.back') }}
    </ElButton>
  </div>
</template>

<style lang="scss" scoped>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 88px;

    .error-icon {
      // font-size: 80px;
      color: var(--main-color);

      .icon {
        width: 260px;
        height: 95px;

        :deep(svg) {
          width: 100%;
          height: 100%;
        }
      }
    }

    .text {
      margin-top: 24px;
      color: var(--text-color-regular);
      font-size: var(--font-size-extra-large);
      font-weight: 700;
      text-align: center;
    }

    .description {
      margin: 24px 0;
      color: var(--text-color-regular);
      font-size: var(--font-size-base);
      font-weight: 400;
    }
  }
</style>
