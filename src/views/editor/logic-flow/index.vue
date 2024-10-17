<script lang="ts" setup>
  import LogicFlow from '@logicflow/core';
  import { BpmnElement, Control, DndPanel, Menu, SelectionSelect, Snapshot } from '@logicflow/extension';
  import { nextTick, onMounted, ref, unref, useTemplateRef } from 'vue';
  import { toLogicFlowData } from './adpter-for-turbo';
  import { configAddItemControl, configDefaultDndPanel } from './config';
  import demoData from './data-turbo.json';
  import '@logicflow/core/dist/index.css';
  import '@logicflow/extension/lib/style/index.css';

  const lf = ref<LogicFlow>({} as LogicFlow);
  const logicFlowElRef = useTemplateRef<HTMLElement>('logic-flow-ref');
  const config = ref({
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
      container: unref(logicFlowElRef)!,
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
  <div ref="logic-flow-ref" class="page-container" />
</template>

<style scoped>
  .page-container {
    height: 100%;
  }
</style>
