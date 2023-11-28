<script lang="ts" setup>
  import { ref } from 'vue';
  import useSortable from '@/hooks/web/useSortable';

  defineOptions({
    name: 'RtDrag',
  });

  const list = ref<Array<string>>([]);
  for (let i = 0; i < 7; i++) {
    list.value.push(`第${i + 1}个`);
  }

  const gridList = ref<Array<string>>([]);
  for (let i = 0; i < 9; i++) {
    gridList.value.push(`第${i + 1}个`);
  }

  const sortableEl = ref<HTMLElement | null>(null);
  useSortable(
    {
      handle: '.handle',
      group: 'name',
      onEnd(e) {
        console.log(e);
      },
    },
    sortableEl,
  );

  const gridSortableEl = ref<HTMLElement | null>(null);
  useSortable(
    {
      handle: '.list-item',
      group: 'name',
      onEnd(e) {
        console.log(e);
      },
    },
    gridSortableEl,
  );
</script>

<template>
  <div>
    <el-row :gutter="30" class="enter-y">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>列表拖拽</span>
            </div>
          </template>
          <div class="card-content">
            <div ref="sortableEl" class="list">
              <div v-for="(item, index) in list" :key="index" class="list-item">
                <span class="handle">::</span>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>宫格拖拽</span>
            </div>
          </template>
          <div class="card-content">
            <div ref="gridSortableEl" class="listgrid">
              <div v-for="(item, index) in gridList" :key="index" class="list-item">
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
  .card-content {
    height: 300px;
    overflow: auto;
  }

  .list {
    width: 100%;

    .list-item {
      width: 100%;
      padding: 20px;
      // line-height: 50px;
      border: 1px solid var(--border-color-light);

      .handle {
        margin-right: 20px;
        cursor: move;
      }
    }

    .sortable-chosen {
      border: 1px solid red;
    }
  }

  .listgrid {
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    grid-template-rows: 100px 100px 100px;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-color-light);
      cursor: move;
    }
  }
</style>
