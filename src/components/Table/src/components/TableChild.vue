<script lang="tsx">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import { getSlot } from '@/utils/slotsHelper';

  export default defineComponent({
    name: 'CtTableItem',
    props: {
      item: {
        type: Object as PropType<Recordable>,
        default: () => {},
      },
    },
    setup(props, { slots }) {
      const { item } = props as unknown as {
        item: Recordable;
      };
      function eLComponent() {
        return <el-table-column {...item} />;
      }

      function slotsComponent() {
        let slotContent: { [key: string]: Function } = {
          default: (scope: Recordable) => getSlot(slots, item.prop, scope),
          header: (scope: Recordable) =>
            getSlot(slots, `${item.prop}_header`, { ...scope, customItem: item }),
        };
        if (!slots[`${item.prop}_header`]) delete slotContent['header'];

        if (!slots[item.prop]) delete slotContent['default'];

        return <el-table-column {...item}>{slotContent}</el-table-column>;
      }

      function renderComponent() {
        const { render, render_header } = item;

        let renderContent: { [key: string]: Function } = {
          default: (scope: Recordable) => render(scope),
          header: (scope: Recordable) => render_header({ ...scope, customItem: item }),
        };

        if (!render_header) delete renderContent['header'];

        if (!render) delete renderContent['default'];

        return <el-table-column {...item}>{renderContent}</el-table-column>;
      }

      return () => {
        const { isSlots, render, render_header } = item;
        const getContent = isSlots
          ? slotsComponent()
          : render || render_header
          ? renderComponent()
          : eLComponent();
        return getContent;
      };
    },
  });
</script>
