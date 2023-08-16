<script setup lang="ts">
  import { _storage } from '@jsxiaosi/utils';
  import Form from './compoontne/form.vue';
  import { AppLocale, AppTheme } from '@/components/Application';

  import { useRootSetting } from '@/hooks/setting/useRootSetting';

  const { appConfig } = useRootSetting();
</script>

<template>
  <div class="page-container">
    <div class="container mx-auto">
      <div class="head">
        <div class="logo -enter-x">
          <img class="logo_img" src="@/assets/logo.png" mode="scaleToFill" />
          <span class="logo_name p-4">{{ appConfig.title }}</span>
        </div>
        <div class="application">
          <AppLocale class="item icon-size enter-x"></AppLocale>
          <AppTheme class="item enter-x"></AppTheme>
        </div>
      </div>
      <div class="login-box">
        <h2 class="enter-y p-4"> {{ $t('sys.login.loginButton') }} </h2>
        <div class="login-form">
          <Form></Form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .back {
    background-color: red;
  }

  .page-container {
    width: 100vw;
    height: 100vh;
    transition: all 0.3s linear;
    border-radius: 0;

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      margin: auto;
      justify-content: space-between;
      padding: 0 2rem;

      .head {
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px 20px;

        .application {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .icon-size {
            font-size: var(--font-size-extra-large);
          }

          .item {
            margin-left: 20px;
          }
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;

          .logo_img {
            width: 32px;
            height: 32px;
          }

          .logo_name {
            color: #999;
            font: bold 200% Consolas, Monaco, monospace;
            text-transform: uppercase;
            font-size: 18px;
            margin-left: 8px;
          }
        }
      }

      .login-box {
        align-self: start;
        margin: auto;
        border-radius: 10px;
        box-shadow: 0 15px 25px 0 rgb(0 0 0 / 60%);
        padding: 40px;
        text-align: center;

        .login-form {
          width: 360px;
        }
      }
    }
  }
</style>
