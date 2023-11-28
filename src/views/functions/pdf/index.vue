<script setup lang="ts">
  import { onBeforeUnmount, ref, watchEffect } from 'vue';
  import VuePdfEmbed from 'vue-pdf-embed';
  import { useEventListener, useDebounceFn } from '@vueuse/core';
  import type { UploadRawFile } from 'element-plus';
  import { ElUpload } from 'element-plus';
  import { fileToBase64 } from '@jsxiaosi/utils';
  import SvgIcon from '@/components/SvgIcon/index.vue';

  const fileSrc = ref<string>();

  const beforeUpload = async (rawFile: UploadRawFile) => {
    fileSrc.value = await fileToBase64(rawFile);
    return false;
  };

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
    pageCount.value = pdfRef.value?.pageCount ?? 0;
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
  <div class="w-full h-full flex flex-col">
    <div>123123</div>
    <ElUpload :limit="1" accept=".pdf" :before-upload="beforeUpload" action="">
      <ElButton style="margin-bottom: 12px">点击上传</ElButton>
    </ElUpload>
    <div v-if="fileSrc" v-loading="isLoading" class="pdf flex-1">
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
        :source="fileSrc"
        @rendered="handleDocumentRender"
      ></VuePdfEmbed>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .pdf {
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
          margin-right: 12px;
          font-size: var(--font-size-large);
        }
      }
    }
  }
</style>
