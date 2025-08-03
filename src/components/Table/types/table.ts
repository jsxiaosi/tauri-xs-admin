import type { RenderRowData, TableColumnCtx } from 'element-plus';

export interface TableColumnProps<T extends Recordable = Recordable>
  extends Partial<Omit<TableColumnCtx<T>, 'prop' | 'children'>> {
  isSlots?: boolean;
  prop?: keyof T;
  render?: (row: any) => JSX.Element;
  render_header?: (row: any) => JSX.Element;
  children?: TableColumnProps<T>[];
}

// export type TableSlotType<T extends object = object> = {
//   [key in keyof T as `${string & key}_header`]: (props: any) => void;
// };

export type TableSlotType<T extends object = object> = {
  [key in keyof T]: (props: RenderRowData<T>) => void;
} & {
  [key in keyof T as `${string & key}_header`]: (
    props: Omit<RenderRowData<T>, 'row' | 'treeNode' | 'expanded'> & {
      customItem: TableColumnProps<T>;
    },
  ) => void;
};
