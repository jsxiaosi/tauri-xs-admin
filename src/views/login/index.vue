<script setup lang="ts">
  import { AppLocale, AppTheme } from '@/components/Application';
  import Form from './compoontne/form.vue';
</script>

<template>
  <div class="page-container">
    <div class="container mx-auto">
      <div class="head">
        <div class="application">
          <AppLocale class="item icon-size enter-x" />
          <AppTheme class="item enter-x" />
        </div>
      </div>
      <div class="login-box">
        <div className="mb-10 flex flex-row items-center justify-center enter-y">
          <img class="h-[44px] w-[44px]" src="@/assets/logo.png" mode="scaleToFill" alt="logo" />
          <h2 className="m-0 ml-4">Vue Xs Admin</h2>
        </div>
        <div class="login-form">
          <Form />
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
        justify-content: flex-end;
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
            width: 44px;
            height: 44px;
          }

          .logo-name {
            margin-left: 8px;
            color: #999;
            font:
              bold 200% Consolas,
              Monaco,
              monospace;
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
