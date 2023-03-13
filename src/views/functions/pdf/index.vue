<script setup lang="ts">
  import { onBeforeUnmount, ref, watchEffect } from 'vue';
  import VuePdfEmbed from 'vue-pdf-embed';
  import { useEventListener, useDebounceFn } from '@vueuse/core';
  import SvgIcon from '@/components/SvgIcon/index.vue';

  const pdfSource = ref<string>('https://supercutexiaosi.top/resource/develop_pdf.pdf');
  const pdfRef = ref<InstanceType<typeof VuePdfEmbed>>();
  const isLoading = ref<boolean>(true);

  const showAllPages = ref<boolean>(false);
  const page = ref<number>(0);
  const pageCount = ref<number>(0);
  watchEffect(() => {
    page.value = showAllPages.value ? 0 : 1;
  });
  const handleDocumentRender = () => {
    isLoading.value = false;
    pageCount.value = pdfRef.value?.pageCount || 0;
  };

  const renderPdf = () => {
    pdfRef.value?.render();
  };
  const resizeRenderPdf = useDebounceFn(renderPdf, 400);
  const cleanup = useEventListener(window, 'resize', resizeRenderPdf);
  onBeforeUnmount(() => {
    cleanup();
  });

  const printerPdf = () => {
    pdfRef.value?.print();
  };
</script>

<template>
  <div v-loading="isLoading" class="pdf">
    <div class="app-header">
      <span v-if="showAllPages"> {{ pageCount }} 页 </span>

      <span v-else>
        <button :disabled="page <= 1" @click="page--">❮</button>

        {{ page }} / {{ pageCount }}

        <button :disabled="page >= pageCount" @click="page++">❯</button>
      </span>

      <div class="config">
        <ElTooltip class="box-item" content="打印pdf" placement="bottom">
          <SvgIcon class="icon cursor" name="iEL-printer" @click="printerPdf"></SvgIcon>
        </ElTooltip>
        <el-switch v-model="showAllPages" class="mb-2" active-text="显示所有pdf" />
      </div>
    </div>
    <VuePdfEmbed
      ref="pdfRef"
      :page="page"
      :source="pdfSource"
      @rendered="handleDocumentRender"
    ></VuePdfEmbed>
  </div>
</template>

<style lang="scss" scoped>
  .pdf {
    min-height: 100%;

    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--border-color-light);
      background-color: var(--main-bg-color);
      color: var(--text-color-primary);

      .config {
        display: flex;
        align-items: center;

        .icon {
          font-size: var(--font-size-large);
          margin-right: 12px;
        }
      }
    }

    .textLayer {
      background-color: var(--main-bg-color);
      color: var(--text-color-primary);
    }
  }
</style>
