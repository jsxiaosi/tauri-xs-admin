<script setup lang="ts">
  import { fileToBase64 } from '@jsxiaosi/utils';
  import { ElUpload } from 'element-plus';
  import { ref, useTemplateRef, watchEffect } from 'vue';
  import VuePdfEmbed from 'vue-pdf-embed';
  // import { useEventListener, useDebounceFn } from '@vueuse/core';
  import type { UploadRawFile } from 'element-plus';
  import SvgIcon from '@/components/SvgIcon/index.vue';

  type VuePdfEmbedProps = InstanceType<typeof VuePdfEmbed>;

  const fileSrc = ref<string>();

  async function beforeUpload(rawFile: UploadRawFile) {
    fileSrc.value = await fileToBase64(rawFile);
    return false;
  }

  const pdfRef = useTemplateRef<InstanceType<typeof VuePdfEmbed>>('pdf-ref');
  const isLoading = ref<boolean>(true);

  const showAllPages = ref<boolean>(false);
  const page = ref<number>(0);
  const pageCount = ref<number>(0);
  watchEffect(() => {
    page.value = showAllPages.value ? 0 : 1;
  });
  function handleDocumentRender() {
    isLoading.value = false;
  }

  // pdfRef 不暴露render方法，所以无法监听到渲染完成事件
  // const renderPdf = () => {
  //   console.log(pdfRef)
  // };
  // const resizeRenderPdf = useDebounceFn(renderPdf, 400);
  // const cleanup = useEventListener(window, 'resize', resizeRenderPdf);
  // onBeforeUnmount(() => {
  //   cleanup();
  // });

  function printerPdf() {
    pdfRef.value?.print();
  }

  const handleOnLoaded: VuePdfEmbedProps['onLoaded'] = value => {
    pageCount.value = value.numPages;
  };
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <ElUpload :limit="1" accept=".pdf" :before-upload="beforeUpload" action="">
      <ElButton style="margin-bottom: 12px"> 点击上传 </ElButton>
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
            <SvgIcon class="icon cursor" name="iEL-printer" @click="printerPdf" />
          </ElTooltip>
          <el-switch v-model="showAllPages" class="mb-2" active-text="显示所有pdf" />
        </div>
      </div>
      <div class="w-full overflow-x-auto">
        <VuePdfEmbed
          ref="pdf-ref"
          :page="page"
          :source="fileSrc"
          @loaded="handleOnLoaded"
          @rendered="handleDocumentRender"
        />
      </div>
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
