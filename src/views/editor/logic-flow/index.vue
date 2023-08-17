<script lang="ts" setup>
  import { nextTick, onMounted, ref, unref } from 'vue';
  import LogicFlow from '@logicflow/core';
  import {
    Snapshot,
    BpmnElement,
    Menu,
    DndPanel,
    SelectionSelect,
    Control,
  } from '@logicflow/extension';
  import '@logicflow/core/dist/style/index.css';
  import '@logicflow/extension/lib/style/index.css';
  import { toLogicFlowData } from './adpter-for-turbo';
  import demoData from './data-turbo.json';
  import { configDefaultDndPanel, configAddItemControl } from './config';

  const lf = ref<LogicFlow>({} as LogicFlow);
  const logicFlowElRef = ref<HTMLElement>({} as HTMLElement);
  let config = ref({
    grid: true,
    background: {
      color: '#f7f9ff',
    },
    keyboard: {
      enabled: true,
    },
  });

  async function initLf() {
    await nextTick();
    // 画布配置
    LogicFlow.use(Snapshot);
    // 使用bpmn插件，引入bpmn元素，这些元素可以在turbo中转换后使用
    LogicFlow.use(BpmnElement);
    // 启动右键菜单
    LogicFlow.use(Menu);
    // 拖拽面板
    LogicFlow.use(DndPanel);
    LogicFlow.use(SelectionSelect);
    // 控制面板
    LogicFlow.use(Control);

    const domLf = new LogicFlow({
      ...unref(config),
      container: unref(logicFlowElRef),
    });
    lf.value = domLf;
    // 设置边类型bpmn:sequenceFlow为默认类型
    unref(lf).setDefaultEdgeType('bpmn:sequenceFlow');
    // 设置拖拽面板选项
    lf.value?.setPatternItems(configDefaultDndPanel(unref(lf) as LogicFlow));
    // 控制面板添加下载按钮
    configAddItemControl(unref(lf) as LogicFlow);
    onRender();
  }

  function onRender() {
    // Turbo数据转换为LogicFlow内部识别的数据结构
    const lFData = toLogicFlowData(demoData);
    lf.value.render(lFData);
  }

  onMounted(() => {
    initLf();
  });
</script>

<template>
  <div ref="logicFlowElRef" class="page-container"></div>
</template>

<style scoped>
  .page-container {
    height: 100%;
  }
</style>
