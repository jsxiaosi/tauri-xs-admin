<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { storage, addClass, removeClass } from '@jsxiaosi/utils';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { AppLocale, AppTheme } from '@/components/Application';

  import { initAsyncRoute } from '@/router/utils';
  import type { UseInfoType } from '@/server/useInfo';
  import { getUserInfo } from '@/server/useInfo';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';

  const { appConfig } = useRootSetting();

  const { t } = useI18n();

  let user = ref('');
  let pwd = ref('');

  const useInput = ref<HTMLElement>();
  const pwdInput = ref<HTMLElement>();

  const router = useRouter();

  const onLogin = async (): Promise<void> => {
    const res = await getUserInfo(user.value, pwd.value);

    if (res.code === 1) {
      storage.setStorage<UseInfoType>('userInfo', res.data);
      await initAsyncRoute(res.data.power);
      router.push('/');
    }
  };

  function onUserFocus() {
    if (useInput.value) {
      addClass(useInput.value, 'focus');
    }
  }

  function onUserBlur() {
    if (user.value.length === 0 && useInput.value) removeClass(useInput.value, 'focus');
  }

  function onPwdFocus() {
    if (pwdInput.value) {
      addClass(pwdInput.value, 'focus');
    }
  }

  function onPwdBlur() {
    if (pwd.value.length === 0 && pwdInput) removeClass(pwdInput.value, 'focus');
  }
</script>

<template>
  <div class="page-container">
    <div class="container mx-auto">
      <!-- <img src="@/assets/login/bg.png" class="wave" /> -->
      <div class="wave">
        <div class="bg"></div>
        <div class="prospect"></div>
        <div class="prospect-bg"></div>
      </div>
      <div class="img -enter-x">
        <SvgIcon name="login_Illustration" />
      </div>

      <div class="application">
        <AppLocale class="item icon-size enter-x"></AppLocale>
        <AppTheme class="item enter-x"></AppTheme>
      </div>
      <div class="login-box">
        <div class="login-form">
          <h2 class="enter-x p-4">{{ appConfig.title }}</h2>
          <div class="enter-x"
            >{{ $t('sys.login.userName') }}：admin {{ $t('sys.login.password') }}：admin123</div
          >
          <div ref="useInput" class="input-group user enter-x">
            <SvgIcon class-name="icon" name="iEL-avatar"></SvgIcon>
            <div>
              <h5>{{ $t('sys.login.userName') }}</h5>
              <input
                v-model="user"
                type="text"
                class="input"
                @focus="onUserFocus"
                @blur="onUserBlur"
              />
            </div>
          </div>
          <div ref="pwdInput" class="input-group pwd enter-x">
            <SvgIcon class-name="icon" name="password"></SvgIcon>

            <div>
              <h5>{{ $t('sys.login.password') }}</h5>
              <input
                v-model="pwd"
                type="password"
                class="input"
                autocomplete="on"
                @focus="onPwdFocus"
                @blur="onPwdBlur"
              />
            </div>
          </div>
          <button class="btn enter-x" @click="onLogin">
            {{ t('sys.login.loginButton') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-container {
    width: 100vw;
    height: 100vh;

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      margin: auto;
      justify-content: space-between;
      padding: 0 2rem;

      .wave {
        position: fixed;
        width: 100vw;
        height: 100%;
        left: 0;
        bottom: 0;
        z-index: 0;

        .bg {
          position: absolute;
          top: -50%;
          left: 0;
          width: 60%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--main-bg-color);
        }

        .prospect {
          width: 30%;
          height: 100%;
          background-color: var(--main-color);
        }

        .prospect-bg {
          position: absolute;
          bottom: -50%;
          left: 4%;
          width: 50%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--main-color);
          z-index: 0;
        }
      }

      .img {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: var(--main-color);
        font-size: 500px;
      }

      @media screen and (max-width: 1024px) {
        .wave,
        .img {
          display: none !important;
        }
      }

      .application {
        position: fixed;
        right: 0;
        top: 0;
        padding: 10px 20px;
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

      .login-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        .login-form {
          width: 360px;

          .avatar {
            width: 350px;
            height: 80px;
          }

          h2 {
            margin: 15px 0;
            color: #999;
            font: bold 200% Consolas, Monaco, monospace;
          }

          .input-group {
            position: relative;
            display: flex;
            align-items: center;
            margin: 25px 0;
            padding: 5px 0;
            border-bottom: 2px solid #d9d9d9;
          }

          .input-group:nth-child(1) {
            margin-bottom: 4px;
          }

          .input-group::before,
          .input-group::after {
            content: '';
            position: absolute;
            bottom: -2px;
            width: 0;
            height: 2px;
            background-color: #c5d3f7;
            transition: 0.5s;
          }

          .input-group::after {
            right: 50%;
          }

          .input-group::before {
            left: 50%;
          }

          .icon {
            color: #d9d9d9;
            font-size: 22px !important;
            transition: 0.5s;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .input-group > div {
            position: relative;
            height: 45px;
            flex: 1;
          }

          .input-group > div > h5 {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #d9d9d9;
            font-size: var(--font-size-medium);
            transition: 0.3s;
            margin: 0;
            padding: 0;
          }

          .input-group.focus .icon {
            color: var(--main-color);
          }

          .input-group.focus div h5 {
            top: -5px;
            font-size: var(--font-size-base);
          }

          .input-group.focus::after,
          .input-group.focus::before {
            width: 50%;
          }

          .input {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: none;
            outline: none;
            background: none;
            padding: 0.5rem 0.7rem;
            font-size: 1.2rem;
            color: var(--text-color-primary);
            font-family: Roboto, sans-serif;
          }

          .input:-webkit-autofill {
            background: none;
            transition: background-color 50000s ease-in-out 0s;
            -webkit-text-fill-color: var(--text-color-primary);
          }

          a {
            display: block;
            text-align: right;
            text-decoration: none;
            color: #999;
            font-size: 0.9rem;
            transition: 0.3s;
          }

          a:hover {
            color: var(--main-color);
          }

          .btn {
            display: block;
            width: 100%;
            height: 50px;
            border-radius: 25px;
            margin: 1rem 0;
            font-size: 1.2rem;
            outline: none;
            border: none;
            background-image: linear-gradient(
              to right,
              var(--main-color),
              var(--sub-color),
              var(--main-color)
            );
            cursor: pointer;
            color: #fff;
            text-transform: uppercase;
            font-family: Roboto, sans-serif;
            background-size: 200%;
            transition: 0.5s;
          }

          .btn:hover {
            background-position: right;
          }
        }
      }
    }
  }
</style>
