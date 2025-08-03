<script lang="tsx">
  import { defineComponent, ref, watch } from 'vue';
  import { converToArray } from '@/utils';
  import { propTypes } from '@/utils/propTypes';
  import Normal from './src/normal';
  import Rebound from './src/rebound/index.vue';

  /**
   * @param type 动画类型 normal:典型动画 , rebound：回退动画
   * @param prefix 前置文案
   * @param duration 动画时长 只针对normal有效
   * @param startVal 动画起始值 只针对normal有效
   * @param numVal 最终显示值
   */
  const CountToProps = {
    type: propTypes.string.def('normal'),
    prefix: propTypes.string.def(''),
    duration: propTypes.number.def(2000),
    startVal: propTypes.number.def(0),
    numVal: propTypes.number.def(1666),
  };

  export default defineComponent({
    name: 'CountTo',
    components: {
      Normal,
      Rebound,
    },
    props: CountToProps,
    setup(props) {
      const reboundValue = ref<Array<Number>>([]);
      watch(
        [() => props.numVal],
        () => {
          if (props.type === 'rebound') {
            reboundValue.value = converToArray(props.numVal);
          }
        },
        {
          immediate: true,
        },
      );
      return () => (
        <div>
          {props.type === 'normal' ? (
            <Normal prefix={props.prefix} duration={props.duration} start-val={props.startVal} end-val={props.numVal} />
          ) : (
            <div class="rebound">
              <span>{props.prefix}</span>
              {reboundValue.value.map((num, inx) => {
                return <Rebound key={inx} i={num as number} blur={inx} delay={inx + 1} />;
              })}
            </div>
          )}
        </div>
      );
    },
  });
</script>

<style lang="scss" scoped>
  .rebound {
    display: flex;
    align-items: center;
  }
</style>
