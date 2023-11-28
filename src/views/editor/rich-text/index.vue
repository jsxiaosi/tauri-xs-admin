<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';
  import wangeDitor from 'wangeditor';
  import i18next from 'i18next';
  import { useI18n } from '@/hooks/web/useI18n';
  import { LocalesEnum } from '@/enum/locales';

  const editorELRef = ref<HTMLElement>({} as HTMLElement);
  const editor = ref<wangeDitor>({} as wangeDitor);
  const html = ref<string>('');
  const { locale } = useI18n();

  function init() {
    editor.value = new wangeDitor(unref(editorELRef));
    editor.value.config.lang =
      locale.value === LocalesEnum.ZHCN ? LocalesEnum.ZHCN : LocalesEnum.EN;
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
    <div ref="editorELRef"></div>
    <div class="inner-html" :innerHTML="html"></div>
  </div>
</template>

<style lang="scss" scoped>
  .inner-html {
    min-height: 50px;
    margin-top: 20px;
    border: 1px solid #e3e3e3;
  }
</style>
