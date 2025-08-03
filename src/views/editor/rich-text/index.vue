<script lang="ts" setup>
  import i18next from 'i18next';
  import { onMounted, ref, unref, useTemplateRef } from 'vue';
  import WangeDitor from 'wangeditor';
  import { LocalesEnum } from '@/enum/locales';
  import { useI18n } from '@/hooks/web/useI18n';

  const editorELRef = useTemplateRef<HTMLElement>('editor-ref');
  const editor = ref<WangeDitor>({} as WangeDitor);
  const html = ref<string>('');
  const { locale } = useI18n();

  function init() {
    editor.value = new WangeDitor(unref(editorELRef));
    editor.value.config.lang = locale.value === LocalesEnum.ZHCN ? LocalesEnum.ZHCN : LocalesEnum.EN;
    editor.value.config.height = 500;
    editor.value.i18next = i18next;
    Object.assign(editor.value.config, {
      onchange() {
        html.value = editor.value.txt.html() as string;
      },
    });
    editor.value.create();
  }

  onMounted(() => {
    init();
  });
</script>

<template>
  <div class="page-container">
    <div ref="editor-ref" />
    <div class="inner-html" :innerHTML="html" />
  </div>
</template>

<style lang="scss" scoped>
  .inner-html {
    min-height: 50px;
    margin-top: 20px;
    border: 1px solid #e3e3e3;
  }
</style>
