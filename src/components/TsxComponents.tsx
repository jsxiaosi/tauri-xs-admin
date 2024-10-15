import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TsxComponents',
  setup(_props) {
    const dataname = ref<string>('admin');
    return () => (
      <>
        <div>TSX：{dataname.value}</div>
        <div>
          <div></div>
        </div>
      </>
    );
  },
});
