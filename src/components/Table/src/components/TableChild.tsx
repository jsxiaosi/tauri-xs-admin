import { ElTableColumn } from 'element-plus';
import { defineComponent } from 'vue';
import type { TableColumnInstance } from 'element-plus';
import type { SetupContext, VNode } from 'vue';
import { getSlot } from '@/utils/slotsHelper';
import type { TableColumnProps } from '../../types/table';

interface RenderType {
  default?: (scope: Recordable) => VNode[] | VNode | null;
  header?: (scope: Recordable) => VNode[] | VNode | null;
}

// TODO: header 存在children时，slots 无法渲染
const TableChild = defineComponent(
  <T extends object = any>(props: { item: TableColumnProps<T> }, { slots }: SetupContext) => {
    const { item } = props;

    function eLComponent(childrenRender: RenderType | null | undefined = null) {
      const { children, ...reItem } = item;
      if (childrenRender?.default) {
        return <ElTableColumn {...(reItem as TableColumnInstance)}>{childrenRender}</ElTableColumn>;
      } else {
        return (
          <ElTableColumn {...(reItem as TableColumnInstance)}>
            {childrenRender?.header}
            {children?.map(child => (
              <TableChild item={child} />
            ))}
          </ElTableColumn>
        );
      }
    }

    function slotsComponent() {
      const slotContent: RenderType = {
        default: (scope: Recordable) => getSlot(slots, String(item.prop), scope),
        header: (scope: Recordable) =>
          getSlot(slots, `${String(item.prop)}_header`, {
            ...scope,
            customItem: item,
          }),
      };
      if (!slots[`${String(item.prop)}_header`]) delete slotContent.header;

      if (!slots[String(item.prop)]) delete slotContent.default;

      return eLComponent(slotContent);
    }

    function renderComponent() {
      const { render, render_header } = item;

      const renderContent: RenderType = {};

      if (render_header) {
        renderContent.header = (scope: Recordable) => render_header({ ...scope, customItem: item });
      }

      if (render) {
        renderContent.default = (scope: Recordable) => {
          // console.log(scope, 'scope', item.type);
          return render({ ...scope, customItem: item });
        };
      }

      return eLComponent(renderContent);
    }

    return () => {
      const { isSlots, render, render_header } = item;
      const getContent = isSlots ? slotsComponent() : render || render_header ? renderComponent() : eLComponent();
      return getContent;
    };
  },
  {
    name: 'TableChild',
    props: ['item'],
  },
);

export default TableChild;
