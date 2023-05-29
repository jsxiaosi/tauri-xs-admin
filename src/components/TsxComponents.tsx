import { defineComponent, defineOptions, ref } from 'vue';

const Comp = defineComponent(
  // TODO: babel plugin to auto infer runtime props options from type
  // similar to defineProps<{...}>()
  <T extends string | number>(props: { msg: T; list: T[] }) => {
    // use Composition API here like in <script setup>
    const count = ref(0);
    defineOptions({
      name: 'Comp',
    });

    return () => (
      // return a render function (both JSX and h() works)
      <div>
        {props.msg} {count.value}
      </div>
    );
  },
);

type List = string;

export default defineComponent({
  name: 'TsxComponents',
  setup(props) {
    console.log(props);
    const dataname = ref<string>('admin');
    return () => (
      <>
        <div>TSX：{dataname.value}</div>
        <Comp<List> msg={'123'} list={['1', '2']}></Comp>
      </>
    );
  },
});
