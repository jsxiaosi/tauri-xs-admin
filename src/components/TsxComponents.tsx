import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TsxComponents',
  setup(props) {
    console.log(props);
    const dataname = ref<string>('admin');
    return () => (
      <>
        <div>TSX：{dataname.value}</div>
      </>
    );
  },
});
