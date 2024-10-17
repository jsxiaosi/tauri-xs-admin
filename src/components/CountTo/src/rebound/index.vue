<script lang="tsx">
  import { defineComponent, getCurrentInstance, onBeforeMount, onBeforeUnmount, ref, unref } from 'vue';
  import { reboundProps } from './props';

  export default defineComponent({
    name: 'CountToRebound',
    props: reboundProps,
    setup(props) {
      const timer = ref<NodeJS.Timeout | string | number | undefined>();

      onBeforeMount(() => {
        const ua = navigator.userAgent.toLowerCase();
        const testUA = (regexp: RegExp) => regexp.test(ua);
        const isSafari = testUA(/safari/g) && !testUA(/chrome/g);

        // Safari浏览器的兼容代码
        isSafari &&
          (timer.value = setTimeout(() => {
            // @ts-expect-error: 对象可能为null
            getCurrentInstance().refs.ul.setAttribute(
              'style',
              `
        animation: none;
        transform: translateY(calc(var(--i) * -9.09%))
      `,
            );
          }, props.delay * 1000));
      });

      onBeforeUnmount(() => {
        clearTimeout(unref(timer));
      });

      return () => (
        <div class="scroll-num" style={{ '--i': props.i, '--delay': props.delay }}>
          <ul ref="ul" style={{ fontSize: '1em' }}>
            <li>0</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>0</li>
          </ul>

          <svg width="0" height="0">
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation={`0 ${props.blur}`} />
            </filter>
          </svg>
        </div>
      );
    },
  });
</script>

<style lang="scss" scoped>
  :root {
    --width: 30px;
  }

  .scroll-num {
    height: 1em;
    overflow: hidden;
    animation: enhance-bounce-in-down 1s calc(var(--delay) * 1s) forwards;
    font-size: 1em;
    line-height: 1em;
    text-align: center;
  }

  ul {
    /* display: flex; */
    animation:
      move 0.3s linear infinite,
      bounce-in-down 1s calc(var(--delay) * 1s) forwards;
  }

  @keyframes move {
    from {
      transform: translateY(-90%);
      filter: url('#blur');
    }

    to {
      transform: translateY(1%);
      filter: url('#blur');
    }
  }

  @keyframes bounce-in-down {
    0% {
      transform: translateY(calc(var(--i) * -9.09% - 7%));
      filter: none;
    }

    25% {
      transform: translateY(calc(var(--i) * -9.09% + 3%));
    }

    50% {
      transform: translateY(calc(var(--i) * -9.09% - 1%));
    }

    70% {
      transform: translateY(calc(var(--i) * -9.09% + 0.6%));
    }

    85% {
      transform: translateY(calc(var(--i) * -9.09% - 0.3%));
    }

    100% {
      transform: translateY(calc(var(--i) * -9.09%));
    }
  }

  @keyframes enhance-bounce-in-down {
    25% {
      transform: translateY(8%);
    }

    50% {
      transform: translateY(-4%);
    }

    70% {
      transform: translateY(2%);
    }

    85% {
      transform: translateY(-1%);
    }

    100% {
      transform: translateY(0);
    }
  }
</style>
