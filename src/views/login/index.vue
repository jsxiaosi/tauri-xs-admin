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
          <img class="logo-img" src="@/assets/logo.png" mode="scaleToFill" />
          <span class="logo-name p-4">{{ appConfig.title }}</span>
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
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      margin: auto;
      padding: 0 2rem;

      .head {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: space-between;
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

          .logo-img {
            width: 32px;
            height: 32px;
          }

          .logo-name {
            margin-left: 8px;
            color: #999;
            font: bold 200% Consolas, Monaco, monospace;
            font-size: 18px;
            text-transform: uppercase;
          }
        }
      }

      .login-box {
        align-self: start;
        margin: auto;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 15px 25px 0 rgb(0 0 0 / 60%);
        text-align: center;

        .login-form {
          width: 360px;
        }
      }
    }
  }
</style>
