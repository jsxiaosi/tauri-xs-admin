<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { Avatar, Lock } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  import { getUserInfo } from '@/server/useInfo';
  import { initRoute } from '@/router/utils';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useUserInfoStoreHook } from '@/store/modules/user';

  const ruleFormRef = ref<FormInstance>();

  const ruleForm = reactive({
    username: '',
    password: '',
  });
  const checked = ref<boolean>(false);

  const { t } = useI18n();

  const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ required: true, trigger: 'blur', message: t('sys.login.rules.userName') }],
    password: [{ required: true, trigger: 'blur', message: t('sys.login.rules.password') }],
  });

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        onLogin();
      } else {
        console.log('error submit!');
        return false;
      }
    });
  };

  const router = useRouter();
  const onLogin = async (): Promise<void> => {
    const res = await getUserInfo(ruleForm.username, ruleForm.password);
    if (res.code === 1) {
      useUserInfoStoreHook().setUserInfo(res.data);
      await initRoute(res.data.role);
      router.push('/');
    }
  };
</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large" class="demo-ruleForm">
    <el-form-item prop="username" class="enter-y">
      <el-input
        v-model="ruleForm.username"
        :prefix-icon="Avatar"
        clearable
        :placeholder="`${$t('sys.login.userName')}：admin`"
      />
    </el-form-item>
    <el-form-item prop="password" class="enter-y">
      <el-input
        v-model="ruleForm.password"
        type="password"
        :prefix-icon="Lock"
        clearable
        show-password
        :placeholder="`${$t('sys.login.password')}：admin123`"
      />
    </el-form-item>

    <el-form-item class="enter-y">
      <div class="form-item-container">
        <el-checkbox v-model="checked" :label="$t('sys.login.rememberPassword')" />
        <el-button link type="primary"> {{ $t('sys.login.forgotPassword') }} </el-button>
      </div>
    </el-form-item>

    <el-form-item class="enter-y">
      <el-button class="submit-btn" @click="submitForm(ruleFormRef)">
        {{ $t('sys.login.loginButton') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
  .submit-btn {
    width: 100%;
  }

  .form-item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
  }
</style>
