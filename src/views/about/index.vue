<script lang="ts" setup>
  import { reactive } from 'vue';
  import packagepath from '../../../package.json';
  const pageDate = reactive({ info: {}, dependencies: {}, devDependencies: {} });

  const toName = {
    info: '项目信息',
    dependencies: '生产依赖',
    devDependencies: '开发依赖',
  };

  pageDate.info = {
    name: packagepath.name,
    version: packagepath.version,
  };
  pageDate.dependencies = packagepath.dependencies;
  pageDate.devDependencies = packagepath.devDependencies;

  console.log(packagepath);
</script>

<template>
  <div>
    <el-row v-for="(item, index) in pageDate" :key="index" :gutter="30" class="enter-y">
      <el-col>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ toName[index] }}</span>
            </div>
          </template>
          <div class="descriptions">
            <el-descriptions class="margin-top" direction="horizontal" :column="2" size="default" border>
              <el-descriptions-item v-for="(i, cindex) in item" :key="cindex" min-width="200px">
                <template #label>
                  {{ cindex }}
                </template>
                <span>{{ i }}</span>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  .box-card {
    margin-bottom: 20px;

    .margin-top :deep(.el-descriptions__body) {
      margin: 20px;
      background-color: #{--main-bg-color} !important;
    }
  }
</style>
